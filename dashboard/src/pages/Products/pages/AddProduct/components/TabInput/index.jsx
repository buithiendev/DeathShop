import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { FastField } from 'formik';
import PropTypes from 'prop-types';
import * as React from 'react';
import EditorField from '~/components/CustomField/EditorField';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabInput() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: '100%',
                border: 1,
                borderRadius: 2,
                borderColor: 'divider',
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Promotion Info" {...a11yProps(1)} />
                    <Tab label="Specifications" {...a11yProps(2)} />
                    <Tab label="Details" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FastField
                    name="description"
                    label="Description"
                    component={EditorField}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FastField
                    name="promotionInfo"
                    label="Promotion Info"
                    component={EditorField}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FastField
                    name="specifications"
                    label="Specifications"
                    component={EditorField}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <FastField
                    name="details"
                    label="Details"
                    component={EditorField}
                />
            </TabPanel>
        </Box>
    );
}
