#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QWidget>
#include <QtWebEngineWidgets>
#include <QWebChannel>
#include "dialog.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();
    QWebEngineView *view;
    QWebChannel *channel;
    Dialog *dialog;
private:
    Ui::MainWindow *ui;
protected:
    void resizeEvent(QResizeEvent *);
};


#endif // MAINWINDOW_H
