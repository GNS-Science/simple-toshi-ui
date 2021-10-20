import React, { useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Typography, CircularProgress, makeStyles, Theme, Tabs, Tab, Box } from '@material-ui/core';

import { GeneralTaskQuery } from './__generated__/GeneralTaskQuery.graphql';
import GeneralTaskChildrenTab from '../components/generalTask/GeneralTaskChildrenTab';
import GeneralTaskDetailTab from '../components/generalTask/GeneralTaskDetailTab';
import TabPanel from '../components/common/TabPanel';
import { sweepsList } from '../service/generalTask.service';
import { GeneralTaskParams } from '../interfaces/generaltask';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    padding: 0,
  },
  tab: {
    width: '20%',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const GeneralTask: React.FC = () => {
  const classes = useStyles();
  const { id, tabName } = useParams<GeneralTaskParams>();
  const data = useLazyLoadQuery<GeneralTaskQuery>(generalTaskQuery, { id });
  const baseUrl = `/GeneralTask/${id}`;

  const initTab = (tabName: string): number => {
    !tabName && history.pushState(null, '', `${baseUrl}/Details`);
    return tabName === 'ChildTasks' ? 1 : 0;
  };
  const [tab, setTab] = useState<number>(initTab(tabName));

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    newValue === 1
      ? history.replaceState(null, '', `${baseUrl}/ChildTasks`)
      : history.replaceState(null, '', `${baseUrl}/Details`);
    setTab(newValue);
  };

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        General Task: Id Not Found
      </Typography>
    );
  }

  const sweptArguments = data?.node?.swept_arguments ?? [''];
  const argumentLists = data?.node?.argument_lists ?? [];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        General Task: {data?.node?.title}
      </Typography>
      <Box className={classes.root}>
        <Tabs orientation="vertical" value={tab} onChange={handleTabChange}>
          <Tab label="Details" id="vertical-tab-0" aria-controls="vertical-tabpannel-0" className={classes.tab} />
          <Tab label="Child Tasks" id="vertical-tab-1" aria-controls="vertical-tabpannel-1" className={classes.tab} />
        </Tabs>
        <TabPanel tab={tab} index={0}>
          <GeneralTaskDetailTab sweepArgs={sweepsList(argumentLists, sweptArguments)} data={data} />
        </TabPanel>
        <TabPanel tab={tab} index={1}>
          <React.Suspense fallback={<CircularProgress />}>
            <GeneralTaskChildrenTab generalTaskData={data} sweepArgs={sweepsList(argumentLists, sweptArguments)} />
          </React.Suspense>
        </TabPanel>
      </Box>
    </>
  );
};

export default GeneralTask;

const generalTaskQuery = graphql`
  query GeneralTaskQuery($id: ID!) {
    node(id: $id) {
      ... on GeneralTask {
        id
        title
        description
        notes
        created
        updated
        agent_name
        model_type
        subtask_type
        subtask_count
        subtask_result
        argument_lists {
          k
          v
        }
        swept_arguments
        children {
          total_count
        }
      }
    }
  }
`;
