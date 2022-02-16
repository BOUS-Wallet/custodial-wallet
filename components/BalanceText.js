/**
 * Copyright (c) 2019 CYBAVO, Inc.
 * https://www.cybavo.com
 *
 * All rights reserved.
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../store/actions';
import { getWalletKey } from '../Helpers';
import { Text } from 'react-native-paper';
const BalanceText: () => React$Node = ({
  currency,
  tokenAddress,
  address,
  textStyle = {},
}) => {
  const dispatch = useDispatch();
  const balanceItem = useSelector(state => {
    let balances = state.balance.balances || {};
    return balances[getWalletKey(currency, tokenAddress, address)];
  });

  const _effectiveBalance = () => {
    if (balanceItem.tokenAddress) {
      return balanceItem.tokenBalance || '0';
    } else {
      return balanceItem.balance || '0';
    }
  };
  useEffect(() => {
    dispatch(fetchBalance(currency, tokenAddress, address, false));
  }, [dispatch]);

  return (
    <React.Fragment>
      {balanceItem && !balanceItem.loading && (
        <Text note style={textStyle}>
          {_effectiveBalance()}
        </Text>
      )}
    </React.Fragment>
  );
};
export default BalanceText;
