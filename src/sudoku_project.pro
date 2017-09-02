#-------------------------------------------------
#
# Project created by QtCreator 2017-08-28T10:43:17
#
#-------------------------------------------------

QT       += core gui webenginewidgets webengine

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = sudoku
TEMPLATE = app

# The following define makes your compiler emit warnings if you use
# any feature of Qt which as been marked as deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0


SOURCES += \
        main.cpp \
        mainwindow.cpp \
    sudokuGenerator.cpp \
    sudokuSolver.cpp \
    main.cpp \
    mainwindow.cpp \
    sudokuGenerator.cpp \
    sudokuSolver.cpp \
    dialog.cpp

HEADERS += \
        mainwindow.h \
    RNG.hpp \
    sudokuGenerator.h \
    sudokuSolver.h \
    mainwindow.h \
    RNG.hpp \
    sudokuGenerator.h \
    sudokuSolver.h \
    dialog.h

FORMS += \
        mainwindow.ui

DISTFILES += \
    UI/js/bootstrap.js \
    UI/js/cell.game-board.js \
    UI/js/jquery.min.js \
    UI/js/sudoku.js \
    UI/js/timer.js \
    UI/fonts/glyphicons-208-remove.png \
    UI/fonts/glyphicons-338-pin-flag.png \
    UI/fonts/glyphicons-435-redo.png \
    UI/fonts/glyphicons-436-undo.png \
    UI/css/bootstrap-theme.css \
    UI/css/bootstrap.css \
    UI/css/cell.button.css \
    UI/css/cell.game-board.css \
    UI/index.html

RESOURCES += \
    resources.qrc

