#include <cstdio>
#include "sudokuSolver.h"

using namespace std;

int bd[100],res[100];

int main(){
	for(int i=0,k=0;i<9;i++)
		for(int j=0;j<9;j++,k++)
			scanf("%d",&bd[k]);
	sudokuSolver(bd,res);
	puts("\n\n");
	for(int i=0,k=0;i<9;i++){
		for(int j=0;j<9;j++,k++)
			printf("%d ",res[k]);
		puts("");
	}
	return 0;
}
