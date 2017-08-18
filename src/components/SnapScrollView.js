import React from 'react';
import { ScrollView } from 'react-native';

const SnapScrollView = ({itemWidth, index, style, children}) => {
    const ref = (scrollView) => {
        if (scrollView) {
            scrollView.scrollTo({x: index * itemWidth});
        }
    };

    return (
        <ScrollView ref={ref} horizontal={true} style={style}>
          { children }
        </ScrollView>
    );
};

export default SnapScrollView;
