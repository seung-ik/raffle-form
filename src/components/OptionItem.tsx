import styled from '@emotion/styled';
import React, { useState } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Box, Input } from '@mui/material';
import { GRAY } from '@const/style';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface Props {
  item: { id: string; value: string };
  qId: string;
  type: string;
  onChange: (qId: string, oId: string, value: string) => void;
}

const OptionItem: React.FC<Props> = ({ item, qId, onChange, type }) => {
  return (
    <Row mt={1}>
      {type === 'multiple' ? (
        <CheckBoxIcon sx={{ fontSize: 20, color: GRAY }} />
      ) : (
        <CircleOutlinedIcon sx={{ fontSize: 20, color: GRAY }} />
      )}

      <Input
        placeholder="Option"
        disableUnderline
        value={item.value}
        onChange={(e) => onChange(qId, item.id, e.target.value)}
        style={{ width: '70%' }}
      />
    </Row>
  );
};

export default OptionItem;

const Row = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;
