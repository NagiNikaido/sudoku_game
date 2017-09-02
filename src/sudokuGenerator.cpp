#include "sudokuGenerator.h"
#include "sudokuSolver.h"
#include "RNG.hpp"
#include <functional>
#include <algorithm>
#include <numeric>

using namespace std;
using namespace std::placeholders;

static const int N = 9;
static const int MN = 11;

void g1(int *,std::function<bool(int *,int)>,int );
void g2(int *,std::function<bool(int *,int)>,int );
void g3(int *,std::function<bool(int *,int)>,int );
void g4(int *,std::function<bool(int *,int)>,int );

const std::function<void(int *,std::function<bool(int *,int)>)>
		g[10]={
			bind(g1,_1,_2,15),
			bind(g1,_1,_2,20),
			bind(g1,_1,_2,25),
			bind(g1,_1,_2,30),
			bind(g1,_1,_2,35),
			bind(g1,_1,_2,40),
			bind(g1,_1,_2,45),
			bind(g1,_1,_2,50),
			bind(g1,_1,_2,55),
			bind(g1,_1,_2,60)
		};
void sudokuGenerator(int *bd,int level){
	while(![](int *bd){
			fill(bd,bd+N*N,0);
			for(int i=1;i<=MN;i++) bd[randomInt(0,N*N)]=randomInt(0,N)+1;
			return sudokuSolver(bd,bd);
		}(bd));
	g[level-1](bd,[](int *bd,int pos){
					int cur=bd[pos];
					for(int i=1;i<=N;i++) if(cur!=i){
						bd[pos]=i;
						if(sudokuSolver(bd,nullptr)){
							bd[pos]=cur;return false;
						}
					}
					bd[pos]=0;return true;
			});
}
void g1(int *bd,std::function<bool(int *,int)> pp,int cnt){
	static int lst[N*N];
	iota(lst,lst+N*N,0);
	for(int i=(N*N)-1;i;i--) swap(lst[i],lst[randomInt(0,i)]);
	for(int pos=0;pos<N*N && cnt;pos++)
		if(pp(bd,lst[pos])) cnt--;
}
void g2(int *bd,std::function<bool(int *,int)> pp,int cnt){
}
void g3(int *bd,std::function<bool(int *,int)> pp,int cnt){
}
void g4(int *bd,std::function<bool(int *,int)> pp,int cnt){
	for(int pos=0;pos<N*N && cnt;pos++)
		if(pp(bd,pos)) cnt--;
}
