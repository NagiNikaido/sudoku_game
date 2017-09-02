#include "sudokuSolver.h"

using namespace std;

static const int N = 9;

struct DLX{
	static const int MaxR = N*N*N;
	static const int MaxC = N*N*4;
	static const int MaxN = MaxR*MaxC+MaxC+1;
	int L[MaxN],R[MaxN],U[MaxN],D[MaxN],row[MaxN],col[MaxN];
	int S[MaxC+1],H[MaxR+1],res[MaxR+1],cnt;
	void init(){
		for(int i=0;i<=MaxC;i++)
			S[i]=0,L[i]=i-1,R[i]=i+1,U[i]=D[i]=i;
		cnt=MaxC;
		L[0]=MaxC;R[MaxC]=0;
		for(int i=1;i<=MaxR;i++) H[i]=-1;
	}
	void link(int r,int c){
		S[c]++;
		col[++cnt]=c;row[cnt]=r;
		D[cnt]=D[c];U[D[c]]=cnt;
		U[cnt]=c;D[c]=cnt;
		if(H[r]<0) H[r]=L[cnt]=R[cnt]=cnt;
		else R[cnt]=R[H[r]],L[R[cnt]]=cnt,
			L[cnt]=H[r],R[H[r]]=cnt;
	}
	void remove(int c){
		L[R[c]]=L[c];R[L[c]]=R[c];
		for(int i=D[c];i!=c;i=D[i])
			for(int j=R[i];j!=i;j=R[j])
				U[D[j]]=U[j],D[U[j]]=D[j],--S[col[j]];
	}
	void resume(int c){
		for(int i=U[c];i!=c;i=U[i])
			for(int j=L[i];j!=i;j=L[j])
				U[D[j]]=D[U[j]]=j,++S[col[j]];
		L[R[c]]=R[L[c]]=c;
	}
	bool solve(int d){
		if(!R[0]) return true;
		int c=R[0];
		for(int i=R[0];i;i=R[i]) if(S[i]<S[c]) c=i;
		remove(c);
		for(int i=D[c];i!=c;i=D[i]){
			res[d]=row[i];
			for(int j=R[i];j!=i;j=R[j]) remove(col[j]);
			if(solve(d+1)) return true;
			for(int j=L[i];j!=i;j=L[j]) resume(col[j]);
		}
		resume(c);
		return false;
	}
};

bool sudokuSolver(const int *bd,int *res)
{
	static DLX slv;
	slv.init();
	for(int i=0,l=0;i<N;i++)
		for(int j=0;j<N;j++,l++)
			for(int k=1;k<=N;k++)
				if(!bd[l] || bd[l]==k){
					int r=l*N+k,
					   c1=l+1,
					   c2=N*N   + i*N + k,
					   c3=N*N*2 + j*N + k,
					   c4=N*N*3 + ((i/3)*3+j/3)*N + k;
					slv.link(r,c1);
					slv.link(r,c2);
					slv.link(r,c3);
					slv.link(r,c4);
				}
	if(!slv.solve(0)) return false;
	if(res){
		for(int i=0;i<N*N;i++){
			int pos=(slv.res[i]-1)/N, num=(slv.res[i]-1)%N+1;
			res[pos]=num;
		}
	}
	return true;
}
