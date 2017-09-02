#ifndef DIALOG_H
#define DIALOG_H

#include <QObject>
#include "sudokuGenerator.h"

class Dialog : public QObject
{
    Q_OBJECT
public:
    explicit Dialog(QObject *parent = nullptr);
signals:
    void sendBoard(const QString &);

public slots:
    void generateBoard(const int );
private:
};


#endif // DIALOG_H
