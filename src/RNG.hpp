#ifndef __RNG_HPP__
#define __RNG_HPP__

#include <ctime>
#include <cstdlib>

unsigned int randomInt(unsigned int l,unsigned int r){
    static bool flag = false;
    if(!flag){
        srand(time(NULL));flag = true;
    }
    unsigned int res = rand();
	return res%(r-l)+l;
}
#endif
