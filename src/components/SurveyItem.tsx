import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { GRAY, PRIMARY_COLOR } from '@const/style';
import dayjs from 'dayjs';

interface Props {
  data: any;
}

const SurveyItem: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const targetTimeFormat = 'YYYY-MM-DD HH:mm:ss';
  const targetTime = dayjs(data.automate_time, { format: targetTimeFormat });
  const isClosed = dayjs().isAfter(targetTime);

  return (
    <Wrapper key={data.id}>
      <Box border="2px solid #DADCE0" borderRadius="4px" maxWidth="880px" width="100%">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #DADCE0',
            padding: '32px 20px 16px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/participants/${data.id}`)}
        >
          <span style={{ fontSize: '36px', fontWeight: '550' }}>{data.survey_title}</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isClosed ? (
              <div
                style={{
                  color: GRAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <div>Closed Survey</div>
                <div style={{ fontSize: '12px' }}>{`(${data.automate_time})`}</div>
              </div>
            ) : (
              <div
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                Ongoing Survey
                <span style={{ fontSize: '12px' }}>{`(${data.automate_time})`}</span>
              </div>
            )}
            {/* <ToggleOnIcon
              sx={{ fontSize: 32, color: PRIMARY_COLOR, cursor: 'pointer' }}
              // onClick={() => onToggleEssential(item.id)}
            /> */}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                textDecoration: 'underline',
                color: isCopied ? '#1064cd' : '#77a2d8',
                marginLeft: '4px',
              }}
              onClick={() =>
                window.open(`${window.location.origin}/enroll/${data.survey_id}`, '_blank')
              }
            >{`${window.location.origin}/enroll/${data.survey_id}`}</span>
            <ContentCopyIcon
              style={{
                cursor: 'pointer',
                fontSize: isCopied ? '12px' : 'inherit',
                color: isCopied ? '#1064cd' : '#77a2d8',
                transition: 'font-size 0.1s, color 0.1s',
              }}
              onClick={() =>
                navigator.clipboard
                  .writeText(`${window.location.origin}/enroll/${data.survey_id}`)
                  .then(() => {
                    setIsCopied(true);
                    // 1초 후에 상태를 초기화하여 잠시 후에 복원되도록 함
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 200);
                  })
                  .catch((error) => {
                    console.error('클립보드 복사 실패:', error);
                  })
              }
            />
          </div>

          {/* <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 40px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <UploadFileOutlinedIcon
                      sx={{ fontSize: 32, color: 'green', cursor: 'pointer' }}
                    />
                    <span>download as excel</span>
                  </div> */}
        </div>
      </Box>
    </Wrapper>
  );
};

export default SurveyItem;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
