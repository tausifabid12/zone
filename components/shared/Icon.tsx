import React from 'react';
import { Image } from 'react-native';

const iconMap: any = {
    home: require('../../assets/icons/filter.png'),
    search: require('../../assets/icons/search.png'),
    user: require('../../assets/icons/filter.png'),
    filter: require('../../assets/icons/filter.png'),
    primaryArrowLeft: require('../../assets/icons/primaryArrowLeft.png'),
    bookmark: require('../../assets/icons/Bookmark-red.png'),
    star: require('../../assets/icons/Star.png'),
    minus: require('../../assets/icons/Minus.png'),
    plus: require('../../assets/icons/Add.png'),
    close: require('../../assets/icons/CloseCircle.png'),
    arrowDown: require('../../assets/icons/ArrowDown.png'),
    arrowLeftBlack: require('../../assets/icons/ArrowLeftBlack.png'),

};

const Icon = ({ name, size }: any) => {
    const iconSource = iconMap[name] || iconMap['home'];

    return (
        <Image
            source={iconSource}
            style={{ width: size, height: size, resizeMode: 'contain' }}
        />
    );
};

export default Icon;
