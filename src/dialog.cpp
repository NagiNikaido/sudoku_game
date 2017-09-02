#include "dialog.h"

Dialog::Dialog(QObject *parent) : QObject(parent)
{

}

void Dialog::generateBoard(const int level){
    int * board = new int [81];
    sudokuGenerator(board,level);
    QString res = "[";
    for(int i = 0;i<81;i+=9){
        res+="[";
        for(int j=0;j<9;j++)
            res+=QString::number(board[i+j])+(j<8 ? "," : "");
        res+="]";
        res+=(i<72 ? "," : "");
    }
    res+="]";
    delete[] board;
    emit sendBoard(res);
}
