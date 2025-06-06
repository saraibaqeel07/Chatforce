const routes = {
    geoLocation: 'system/google/autocomplete',
    getLocationDetail: 'system/google/placeDetails',
    CreatePlace: '/system/places/create',
    SendOtp: 'users/changePassword',
    Login:'/auth/login',
    getPlaces:'/system/places',
    UpdatePlace:'/system/places/update',
    getProfile:'/auth/profile',
    DeletePlace:'/system/places/delete',
    getDoctors:"/system/doctors",
    DeleteDoctor:'/system/doctors/delete',
    GetSpecialty:'/system/doctors/specialties',
    CreateDoctor:'/system/doctors/create',
    UpdateDoctor:'/system/doctors/update',
    getJobs:'/system/jobs',
    DeleteJob:'/system/jobs/delete',
    CreateJob:'/system/jobs/create',
    getFaqs:'/system/faqs',
    DeleteFaq:"/system/faqs/delete",
    CreateFaq:'/system/faqs/create',
    UpdateProfile:'/auth/updateProfile',
    UpdateJob:'/system/jobs/update',
    getEvents:'/system/events',
    uploadDocuments:'/system/upload',
    CreateEvent:'/system/events/create',
    DeleteEvent:'/system/events/delete',
    UpdateEvent:'/system/events/update',
    UpdateSettings:'/system/settings/update',
    getSettings:'/system/settings',
    AddBlockSlots:'/appointments/block',
    getBlockSlots:'/appointments/blockedSlots',
    DeleteBlockSlot:'/appointments/blockedSlots/delete',
    getUsers:'/users',
    getUserDetail:'/users/profile',
    getQuestions:'/appointments/questions',
    DeleteQuestion:'/appointments/questions/delete',
    CreateQuestion:"/appointments/questions/add",
    getCalendar:'/appointments/calendar',
    getAppointments:'/appointments/byDate',
    getAppointmentsByUser:'/appointments/byUser',
    SendNotifications:'/notifications/send',
    getStats:'system/stats',
    getAppointmentDetail:'appointments/details',
    getTopics:'/community/topics',
    DeleteTopic:"/community/topics/delete",
    CreateTopic:'/community/topics/add',
    UpdateTopic:'/community/topics/update',
    getPosts:'/community/posts',
    DeletePost:'/community/posts/delete',
    CreatePost:'/community/posts/add',
    UpdatePost:'/community/posts/update',
    getPostData:'/community/posts/details',
    getBlogs:'/system/blogs/',
    DeleteBlog:"/system/blogs/delete",
    CreateBlog:'/system/blogs/create',
    getBlogData:"/system/blogs/details",
    UpdateBlog:'/system/blogs/update',
    getStaffs:'/users',
    UpdateStaff:'/auth/updateProfile',
    CreateStaff:'/auth/register',
    getPatients:'/patients',
    DeletePatient:'/patients/delete',
    CreatePatient:'/patients/add',
    GetPatientDetails:'/patients/details',
    UpdatePatient:'/patients/update',
    CreateAfterDocument:'/system/documents/add',
    getAfterCareDocuments:'/system/documents',
    DeleteAfterCareDoc:'/system/documents/delete',
    getAfterCareDocumentDetail:'/system/documents/details',
    UpdateAfterCareDocument:'/system/documents/update',
    CreateForm:'/patients/forms/add',
    getConsentForms:'/patients/forms',
    DeleteForm:'patients/forms/delete',
    getFormDetail:'/patients/forms/details',
    UpdateForm:'/patients/forms/update',
    SendForm:'/patients/forms/send',
    CompleteForm:'/patients/forms/complete',
    CreateFormTemplate:'/patients/forms/templates/add',
    getFormTemplates:"/patients/forms/templates",
    DeleteFormTemplate:'',
    UpdateFormTemplate:'/patients/forms/templates/update',
    getFormTemplateDetail:'/patients/forms/templates/details'
    
};

export default routes