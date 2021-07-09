import React from 'react';
import CSS from 'csstype';



function CustomDragCard() {
    // const { isDragging,
    //     initialOffset,
    //     currentOffset } = useDragLayer(monitor => ({
    //         isDragging: monitor.isDragging(),
    //         initialOffset: monitor.getInitialSourceClientOffset(),
    //         currentOffset: monitor.getSourceClientOffset(),
    //     }));


    const getItemStyles = (initialOffset: any, currentOffset: any): CSS.Properties => {
        if (!initialOffset || !currentOffset) {
            return {
                display: "none"
            };
        }
        let { x, y } = currentOffset;
        const transform = `translate(${x + 20}px, ${y - 20}px)`;
        return {
            transform,
            position: 'absolute',
        };
    }

    return (
        <>
            {/* {isDragging ? <img className={styles.cardImg} style={getItemStyles(initialOffset, currentOffset)} src={images['H2']} alt="" /> : null} */}
        </>
    );
}

export default CustomDragCard;