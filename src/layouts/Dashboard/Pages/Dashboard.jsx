import { Box, Card, CardContent, Grid, Typography, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ApiServices from "../../../services/Apis";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const getData = async () => {
    try {
      let params = {
        page: 1,
        limit: 999
      };
      const data = await ApiServices.getStats(params);
      setStats(data?.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const statsData = [
    {
      title: "Total Chats",
      value: "1,290",
      increase: "+18.2%",
      icon: <ChatBubbleOutlineIcon fontSize="large" />,
    },
    {
      title: "Total Leads",
      value: "780",
      increase: "+6.2%",
      icon: <EmojiPeopleIcon fontSize="large" />,
    },
    {
      title: "Total Billable Leads",
      value: "520",
      increase: "+3.2%",
      icon: <TaskAltIcon fontSize="large" />,
    },
    {
      title: "Call Connect Used",
      value: "180",
      increase: "+3.2%",
      icon: <LocalPhoneIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Welcome, <span style={{ fontWeight: 800 }}>Tahir Javed</span>
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" sx={{border:'1px solid gray',color:'black',textTransform:'capitalize'}} startIcon={<CalendarTodayOutlinedIcon />}>
            Pick a date
          </Button>
          <Button variant="outlined" sx={{border:'1px solid gray',color:'black',textTransform:'capitalize'}} startIcon={<FilterAltOutlinedIcon />}>
            Filter
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {statsData.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card elevation={1} sx={{ borderLeft: "4px solid green", borderRadius: 2 }}>
              <CardContent sx={{ position: "relative", height: 100 }}>
                <Box sx={{ position: "absolute", top: 16, right: 16, color: "#444" }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {item.value}
                </Typography>
                <Typography color="text.secondary">{item.title}</Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'inline-block', color: "green", fontWeight: 600 }}>
                  {item.increase} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
