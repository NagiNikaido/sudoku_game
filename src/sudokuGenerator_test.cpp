#include "sudokuGenerator.h"
#include "sudokuSolver.h"
#include <bits/stdc++.h>

using namespace std;

int bd[81];
int res[81];

void print_sudoku(int *res){
	for(int i=0,k=0;i<9;i++){
		for(int j=0;j<9;j++,k++)
			printf("%d ",res[k]);
		puts("");
	}
}

int main()
{
	int level;
	scanf("%d",&level);
	sudokuGenerator(bd,level);
	sudokuSolver(bd,res);
	print_sudoku(bd);
	puts("\n");
	print_sudoku(res);
}
