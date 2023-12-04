import { GRAY, PRIMARY_COLOR } from '@const/style';
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import OptionItem from './OptionItem';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  item: {
    id: string;
    type: string;
    title: string;
    isEssential: boolean;
    options: { id: string; value: string }[];
  };
  onTitleChange: (_id: string, _value: string) => void;
  handleOptionChange: (_qId: string, _oId: string, _value: string) => void;
  onClickAddOption: (_id: string) => void;
  onToggleEssential: (_id: string) => void;
  onDeleteClick: (_id: string) => void;
  onQTypeChange: (_id: string, _value: string) => void;
}

const Qgenerator: React.FC<Props> = ({
  item,
  onTitleChange,
  handleOptionChange,
  onClickAddOption,
  onToggleEssential,
  onDeleteClick,
  onQTypeChange,
}) => {
  const [type, setType] = useState('multiple');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box
      border="2px solid #DADCE0"
      borderRadius="4px"
      minWidth="580px"
      maxWidth="880px"
      width="100%"
      p="20px 24px"
    >
      <Stack direction={'row'} gap={4} alignItems={'center'}>
        <HInput
          placeholder="Untitled Questionnaire"
          disableUnderline
          value={item.title}
          onChange={(e) => onTitleChange(item.id, e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
          <InputLabel id="demo-select-small-label">type</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={item.type}
            label="Age"
            onChange={(e) => onQTypeChange(item.id, e.target.value)}
          >
            <MenuItem value={'multiple'}>multiple choice questions</MenuItem>
            <MenuItem value={'single'}>single choice questions</MenuItem>
            <MenuItem value={'short'}>short answer</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {item.type !== 'short' &&
        item.options.map((option) => {
          return (
            <OptionItem key={option.id} item={option} qId={item.id} onChange={handleOptionChange} />
          );
        })}

      {item.type !== 'short' && (
        <Row mt={2}>
          <CircleOutlinedIcon sx={{ fontSize: 20, color: GRAY }} />
          <span
            onClick={() => onClickAddOption(item.id)}
            style={{ color: '#7896C9', cursor: 'pointer' }}
          >
            Add options
          </span>
        </Row>
      )}
      <Row mt={1} justifyContent={'flex-end'}>
        <span>Essential</span>
        {item.isEssential ? (
          <ToggleOnIcon
            sx={{ fontSize: 32, color: PRIMARY_COLOR, cursor: 'pointer' }}
            onClick={() => onToggleEssential(item.id)}
          />
        ) : (
          <ToggleOffIcon
            sx={{ fontSize: 32, color: GRAY, cursor: 'pointer' }}
            onClick={() => onToggleEssential(item.id)}
          />
        )}
        <DeleteIcon
          sx={{ fontSize: 32, cursor: 'pointer', marginLeft: '16px' }}
          onClick={() => onDeleteClick(item.id)}
        />
      </Row>
    </Box>
  );
};

export default Qgenerator;

const HInput = styled(Input)`
  border-bottom: 1px solid ${GRAY};
  width: 100%;
`;

const Row = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;
