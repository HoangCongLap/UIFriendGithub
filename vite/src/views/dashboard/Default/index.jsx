import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format } from "date-fns";
import TotalGrowthBarChart from './TotalGrowthBarChart';
import PopularCard from './PopularCard';



export default function ProfilePage() {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const today = new Date();
    const data = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        date: format(date, "yyyy-MM-dd"),
        count: Math.floor(Math.random() * 5),
      });
    }
    setContributions(data);
  }, []);

  const infUser = {
    name: "Hoàng Công Lập",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    bio: "🌱 I’m currently learning Information Technology at university UEF",
    email: "lapconghoang@gmail.com",
    intro: "👋 Hi, I’m Hoàng Công Lập",
  };

  const repos = [
    { name: "API-scholarship-application-project", lang: "Java", color: "#b07219", accessType: "Public" },
    { name: "Calculator", lang: "JavaFX", color: "#b07219", accessType: "Private" },
    { name: "GameTrueOrFalse", lang: "Java", color: "#b07219", accessType: "Public" },
    { name: "web_store", lang: "JavaScript", color: "#f1e05a", accessType: "Public" },
    { name: "web_vocab_master", lang: "TypeScript", color: "#3178c6", accessType: "Private" },
    { name: "XucXacGame", lang: "Java", color: "#b07219", accessType: "Public" },
    { name: "test1", lang: "Java", color: "#b07219", accessType: "Private" },
    { name: "test2", lang: "Java", color: "#b07219", accessType: "Public" },
    { name: "test3", lang: "Java", color: "#b07219", accessType: "Private" },
    { name: "tes4", lang: "Java", color: "#b07219", accessType: "Public" },
  ];

  return (
    <Box p={3} maxWidth="900px" mx="auto">
      {/* Profile Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={infUser.avatar} sx={{ width: 100, height: 100 }} />
            <Box>
              <Typography variant="h6">{infUser.intro}</Typography>
              <Typography variant="body2" color="text.secondary">
                {infUser.bio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📫 How to reach me:{" "}
                <a href={`mailto:${infUser.email}`}>{infUser.email}</a>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Pinned Repositories */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pinned
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}              // khoảng cách giữa các card
          >
            {repos.slice(0, 6).map((repo, idx) => (
              <Box
                key={idx}
                flex="0 0 calc(50% - 8px)"   // 2 card mỗi hàng
                maxWidth="calc(50% - 8px)"
              >
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                      {repo.name}
                      <Chip
                        label={repo.accessType}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: "#E0F2FE",
                          color: "#0284C7",
                        }}
                      />
                    </Typography>
                    <Box mt={1}>
                      <Typography variant="body2" color="text.secondary">
                        ● {repo.lang}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>


      {/* Contributions Heatmap */}
      {/* Contributions Heatmap */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {contributions.length} contributions in the last year
          </Typography>

          <Grid container spacing={2}>
            {/* Cột trái: Heatmap */}
            <Grid item xs={12} md={8}>
              <ReactCalendarHeatmap
                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                endDate={new Date()}
                values={contributions}
                classForValue={(value) => {
                  if (!value) return "color-empty";
                  return `color-scale-${value.count}`;
                }}
              />
            </Grid>

            {/* Cột phải: Chart */}
            <Grid item xs={12} md={4}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography variant="caption" color="text.secondary">
              Less — More
            </Typography>
          </Box>
        </CardContent>
      </Card>


    </Box >
  );
}
