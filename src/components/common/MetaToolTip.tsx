import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { MetaArguments } from '../../interfaces/mySolutions';

const Info = styled(Typography)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',
  alignContent: 'space-between',
}));

export const tagToolTip = (v: string | null | undefined): JSX.Element | undefined => {
  if (v) {
    try {
      const cleanedJson = JSON.parse(v?.replaceAll("'", '"').replaceAll('False', 'false').replaceAll('True', 'true'));
      if (v && 'tag' in cleanedJson) {
        return (
          <Tooltip title={v}>
            <span style={{ display: 'inline-flex' }}>
              {cleanedJson.tag}
              <InfoIcon sx={{ fontSize: 20, position: 'relative', top: 1, left: 2 }} color="disabled" />
            </span>
          </Tooltip>
        );
      } else {
        return <span>{v}</span>;
      }
    } catch {
      return <span>{v}</span>;
    }
  }
};

interface MetaToolTipProps {
  meta: MetaArguments;
}

export const MetaToolTip: React.FC<MetaToolTipProps> = ({ meta }: MetaToolTipProps) => {
  return (
    <Info>
      {meta.map(
        (kv) =>
          kv && (
            <p style={{ padding: 0, margin: 0 }} key={kv?.k}>
              <strong>{kv?.k}:</strong> {tagToolTip(kv?.v)} &nbsp;
            </p>
          ),
      )}
    </Info>
  );
};
