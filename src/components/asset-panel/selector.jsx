import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';
import Box from '../box/box.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import SortableAsset from './sortable-asset.jsx';

import styles from './selector.css';

import bindAll from 'lodash.bindall';

const Selector = props => {
    const {
        buttons,
        dragType,
        items,
        selectedItemIndex,
        draggingIndex,
        ordering,
        onAddSortable,
        onRemoveSortable,
        onDeleteClick,
        onDuplicateClick,
        onItemClick
    } = props;

    let newButtonSection = null;

    if (buttons.length > 0) {
        const {img, title, onClick} = buttons[0];
        const moreButtons = buttons.slice(1);
        newButtonSection = (
            <Box className={styles.newButtons}>
                <ActionMenu
                    img={img}
                    moreButtons={moreButtons}
                    title={title}
                    onClick={onClick}
                />
            </Box>
        );
    }

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.listArea}>
                {items.map((item, index) => (
                    <SortableAsset
                        id={item.name}
                        index={ordering.indexOf(index)}
                        key={item.name}
                        onAddSortable={onAddSortable}
                        onRemoveSortable={onRemoveSortable}
                    >
                        <SpriteSelectorItem
                            assetId={item.assetId}
                            className={classNames(styles.listItem, {
                                [styles.placeholder]: index === draggingIndex
                            })}
                            costumeURL={item.url}
                            details={item.details}
                            dragType={dragType}
                            id={index}
                            index={index}
                            name={item.name}
                            number={index + 1 /* 1-indexed */}
                            selected={index === selectedItemIndex}
                            onClick={onItemClick}
                            onDeleteButtonClick={onDeleteClick}
                            onDuplicateButtonClick={onDuplicateClick}
                        />
                    </SortableAsset>
                ))}
            </Box>
            {newButtonSection}
        </Box>
    );
};

Selector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        onClick: PropTypes.func
    })),
    dragType: PropTypes.string,
    draggingIndex: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired
    })),
    onAddSortable: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onDuplicateClick: PropTypes.func,
    onItemClick: PropTypes.func.isRequired,
    onRemoveSortable: PropTypes.func,
    ordering: PropTypes.arrayOf(PropTypes.number),
    selectedItemIndex: PropTypes.number.isRequired
};

export default Selector;
