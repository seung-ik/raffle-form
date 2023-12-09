import Header from '@components/Header';
import { GRAY, PRIMARY_COLOR } from '@const/style';
import styled from '@emotion/styled';
import { Box, Button, FormControl, Input } from '@mui/material';
import React, { useState } from 'react';
import Qgenerator from '../../components/Qgenerator';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import dayjs from 'dayjs';
import { Paths } from '@pages/Router';
import { useNavigate } from 'react-router-dom';
import { useRaffleContract } from '@hooks/useRaffleContract';
import SubmitWithDialog from '@components/SubmitWithDialog';

const MainPage = () => {
  const { getSurvey, setSurvey } = useRaffleContract();
  const navigate = useNavigate();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDesc, setSurveyDesc] = useState('');
  const [automateTime, setAutomateTime] = useState<null | string>(null);
  const [winnersCount, setWinnersCount] = useState('1');
  const [questionInfo, setQuestionInfo] = useState([
    {
      id: crypto.randomUUID(),
      title: '',
      type: 'multiple',
      isEssential: false,
      options: [{ id: crypto.randomUUID(), value: '' }],
    },
  ]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [txResult, setTxResult] = useState<any>({});
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleQTitle = (_id: string, _value: string) => {
    const newInfo = questionInfo.map((info) => {
      if (info.id === _id) {
        return { ...info, title: _value };
      } else {
        return info;
      }
    });
    setQuestionInfo(newInfo);
  };

  const handleQOption = (_qId: string, _oId: string, _value: string) => {
    const newInfo = questionInfo.map((info) => {
      if (info.id === _qId) {
        return {
          ...info,
          options: info.options.map((option) => {
            if (option.id === _oId) {
              return { ...option, value: _value };
            } else {
              return option;
            }
          }),
        };
      } else {
        return info;
      }
    });
    setQuestionInfo(newInfo);
  };

  // 애는 핸들링 함수를 재사용 가능하게 만들고 옵션이랑 세부 내용 컨트롤은 하위 에서 하는게 맞겠다.
  const handleAddOptions = (_id: string) => {
    const newInfo = questionInfo.map((info) => {
      if (info.id === _id) {
        return { ...info, options: info.options.concat({ id: crypto.randomUUID(), value: '' }) };
      } else {
        return info;
      }
    });
    setQuestionInfo(newInfo);
  };

  const handleQEssentialToggle = (_id: string) => {
    const newInfo = questionInfo.map((info) => {
      if (info.id === _id) {
        return { ...info, isEssential: !info.isEssential };
      } else {
        return info;
      }
    });
    setQuestionInfo(newInfo);
  };

  const handleQDelete = (_id: string) => {
    const newQuestionInfo = questionInfo.filter((info) => info.id !== _id);
    setQuestionInfo(newQuestionInfo);
  };

  const handleQType = (_id: string, _value: string) => {
    const newQuestionInfo = questionInfo.map((info) => {
      if (info.id === _id) {
        return {
          ...info,
          type: _value,
          options: [{ id: crypto.randomUUID(), value: '' }],
        };
      } else {
        return info;
      }
    });
    setQuestionInfo(newQuestionInfo);
  };

  const onAddQuestionClick = () => {
    setQuestionInfo((prev) =>
      prev.concat({
        id: crypto.randomUUID(),
        type: 'multiple',
        title: '',
        isEssential: false,
        options: [{ id: crypto.randomUUID(), value: '' }],
      }),
    );
  };

  const onClickSubmit = async () => {
    if (!winnersCount) {
      alert('Set winners numbers');
      return;
    }
    if (!automateTime) {
      alert('Set automate time');
      return;
    }

    if (!auth.currentUser) {
      alert('Requires a login.');
      return;
    }

    setIsOpenDialog(true);
    setSubmitLoading(true);

    const userInfo = auth.currentUser;
    const surveyId = crypto.randomUUID();
    const parsedAutomatTime = new Date(automateTime).getTime();

    try {
      await setDoc(
        doc(db, 'question', surveyId),
        {
          survey_id: surveyId,
          user_id: userInfo.uid,
          survey_title: surveyTitle,
          survey_describe: surveyDesc,
          automate_time: automateTime,
          winnersCount: winnersCount,
        },
        { merge: true },
      );

      await setDoc(
        doc(db, 'detail', surveyId),
        {
          survey_id: surveyId,
          questions: questionInfo,
        },
        { merge: true },
      );

      const txResult = await setSurvey(surveyId, parsedAutomatTime, Number(winnersCount)); // 컨트랙트에 저장
      setTxResult(txResult);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const submitCallback = () => {
    navigate(Paths.Answer);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Box
          borderTop={`10px solid ${PRIMARY_COLOR}`}
          borderRadius="4px"
          minWidth="580px"
          maxWidth="880px"
          width="100%"
          mb="36px"
        >
          <Box border="2px solid #DADCE0" borderTop="none" padding="12px">
            <Input
              autoFocus
              placeholder="Untitled Questionnaire"
              disableUnderline
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              style={{ width: '70%' }}
            />
          </Box>
          <Box
            border="2px solid #DADCE0"
            borderTop="none"
            padding="12px"
            borderRadius="0 0 4px 4px"
          >
            <textarea
              style={{
                color: PRIMARY_COLOR,
                fontSize: '14px',
                width: '70%',
                border: 'none',
                resize: 'none',
                height: 'auto',
                minHeight: '140px',
                outline: 'none',
              }}
              placeholder="Describe your survey"
              value={surveyDesc}
              onChange={(e: any) => {
                setSurveyDesc(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Col>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
              <FormControl sx={{ padding: 0, minWidth: 240 }} size="small">
                <DateTimePicker
                  label="Set Automate Time"
                  slotProps={{ textField: { size: 'small' } }}
                  value={automateTime ? new Date(automateTime) : null}
                  onChange={(newDate: Date | null) => {
                    const dateString = newDate ? dayjs(newDate).format('YYYY-MM-DD HH:mm:ss') : '';
                    setAutomateTime(dateString);
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <Box border="1px solid #DADCE0" borderRadius="4px" padding="2px 12px">
              The number of winners |{' '}
              <Input
                value={winnersCount}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/[^0-9]/g, '');

                  setWinnersCount(inputValue);
                }}
                disableUnderline
                style={{ marginLeft: '6px', width: '48px', color: PRIMARY_COLOR }}
              />
            </Box>
          </div>
          <Box
            border="2px solid #DADCE0"
            borderRadius="4px"
            minWidth="580px"
            maxWidth="880px"
            width="100%"
            p="20px 24px"
          >
            <Input
              disableUnderline
              value="email"
              style={{ borderBottom: `1px solid ${GRAY}`, width: '100%' }}
            />
          </Box>

          {questionInfo.map((info) => {
            return (
              <Qgenerator
                key={info.id}
                item={info}
                onTitleChange={handleQTitle}
                handleOptionChange={handleQOption}
                onClickAddOption={handleAddOptions}
                onToggleEssential={handleQEssentialToggle}
                onDeleteClick={handleQDelete}
                onQTypeChange={handleQType}
              />
            );
          })}
        </Col>

        <Row mt={4}>
          <SubmitWithDialog
            submit={onClickSubmit}
            callback={submitCallback}
            isLoading={submitLoading}
            data={txResult}
            isOpen={isOpenDialog}
            setIsOpen={setIsOpenDialog}
            title="Enroll Survey"
          />

          <Button variant="outlined" onClick={onAddQuestionClick}>
            Add Question
          </Button>
        </Row>
      </Wrapper>
    </>
  );
};

export default MainPage;

const Wrapper = styled('div')`
  padding: 42px 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Row = styled(Box)`
  display: flex;
  justify-content: space-between;
  min-width: 580px;
  max-width: 880px;
  width: 100%;
  align-items: center;
`;

const Col = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 580px;
  max-width: 880px;
  width: 100%;
  gap: 20px;
`;
