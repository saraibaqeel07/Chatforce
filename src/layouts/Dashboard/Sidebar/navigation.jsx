import { lazy } from "react"
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArticleIcon from "@mui/icons-material/Article";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssignmentIcon from "@mui/icons-material/Assignment";



const Dashboard = lazy(() => import("../Pages/Dashboard"))

const Staffs = lazy(() => import("../Pages/Staffs"))
const DeletedPatients = lazy(() => import("../Pages/DeletedPatients"))
const AfterCareDocuments = lazy(() => import("../Pages/AfterCareDocuments"))
const CreateForm = lazy(() => import("../Pages/CreateConsentForm"))
const ConsentForms = lazy(() => import("../Pages/ConsentForms"))
const CreateFormTemplate = lazy(() => import("../Pages/CreateFormTemplate"))
const CompletedForms = lazy(() => import("../Pages/CompletedForms"))
const FormTemplates = lazy(() => import("../Pages/FormTemplates"))
const Navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    icon: <DashboardIcon sx={{ fontSize: "22px" }} />,
  },
 
  
];

export default Navigation; 

