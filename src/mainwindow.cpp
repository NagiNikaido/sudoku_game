#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    this->setWindowTitle("Sudoku Game");
    view = new QWebEngineView(this);
    dialog = new Dialog(this);
    channel = new QWebChannel(this);
    channel->registerObject(QStringLiteral("dialog"),dialog);
    view->page()->setWebChannel(channel);
    view->setUrl(QUrl(QStringLiteral("qrc:/UI/index.html")));
    view->show();
    this->setMinimumHeight(700);
    this->setMinimumWidth(1000);
}

MainWindow::~MainWindow()
{
    delete ui;
    delete view;
    delete channel;
    delete dialog;
}

void MainWindow::resizeEvent(QResizeEvent *)
{
    view->resize(this->size());
}
