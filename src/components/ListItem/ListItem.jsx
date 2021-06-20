import { makeStyles } from '@material-ui/core';
import * as colors from 'constants/colors';
import classNames from 'classnames';
import ListItemMUI from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import React from 'react';

const getClasses = makeStyles(() => ({
  selected: {
    background: colors.LIST_ITEM.selected,
    borderRight: `4px solid ${colors.LIST_ITEM.border}`,
  },
  variant_button_selected: {
    '&:hover': {
      background: colors.LIST_ITEM.selected,
    }
  },
  variant_button: {
    '&:hover': {
      background: colors.LIST_ITEM.hovered,
    }
  }
}));

const ListItem = ({
  children,
  selected = false,
  variant = 'default',
}) => {
  const classes = getClasses();
  return (
    <ListItemMUI
      classes={{
        root: classNames(
          selected
            ? classes[`variant_${variant}_selected`]
            : classes[`variant_${variant}`],
          selected && classes.selected,
        ),
      }}
      button={variant === 'button'}
    >
      {children}
    </ListItemMUI>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  variant: PropTypes.oneOf([
    'button',
    'default',
  ]),
};

export default ListItem;