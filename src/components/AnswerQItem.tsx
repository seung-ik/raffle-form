import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { ChangeEvent } from 'react';

interface Props {
  data: any;
  onChangeAnswer: (_id: string, _info: any) => void;
}

const AnswerQItem: React.FC<Props> = ({ data, onChangeAnswer }) => {
  const onChangeShortAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data, shortAnswer: e.target.value };
    onChangeAnswer(data.id, newData);
  };

  const onChangeMultipleAnswer = (e: any, checked: boolean) => {
    const targetId = e.target.value;
    const selectedOptions = [...data.selectedOptions];

    let newSelectedOptions;
    if (checked) {
      newSelectedOptions = selectedOptions.concat(targetId);
    } else {
      newSelectedOptions = selectedOptions.filter((_id) => _id !== targetId);
    }
    const newData = { ...data, selectedOptions: newSelectedOptions };
    onChangeAnswer(data.id, newData);
  };

  const onChangeSingleAnswer = (e: any, checked: boolean) => {
    if (!checked) return;
    const targetId = e.target.value;
    const newSelectedOptions = [targetId];
    const newData = { ...data, selectedOptions: newSelectedOptions };

    onChangeAnswer(data.id, newData);
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
      <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>Q. {data.title}</div>

      {data.type === 'short' && (
        <Input style={{ width: '70%' }} value={data.shortAnswer} onChange={onChangeShortAnswer} />
      )}
      {data.type === 'multiple' && (
        <FormGroup>
          {data.options.map((option: any) => {
            return (
              <FormControlLabel
                key={option.id}
                control={<Checkbox />}
                label={option.value}
                value={option.id}
                onChange={onChangeMultipleAnswer}
              />
            );
          })}
        </FormGroup>
      )}
      {data.type === 'single' && (
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {data.options.map((option: any) => {
              return (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.value}
                  onChange={onChangeSingleAnswer}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
};

export default AnswerQItem;
