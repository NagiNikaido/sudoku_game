#ifndef SUDOKU_SOLVER_H
#define SUDOKU_SOLVER_H


// bool sudokuSolver(const int *board, int *result)
//  输入： board， 带空格的盘面
//        result， 最终盘面的输出地址，可为nullptr
//  输出： 返回一个bool值，若有解则返回true，否则返回false
//        同时，若有解且result不为nullptr，本函数会将最终盘面dump至result中

bool sudokuSolver(const int *,int *);

#endif
