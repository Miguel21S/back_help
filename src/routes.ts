
import { Router } from 'express';
import routerController from './controllers/router';
import routerUsers from './entities/routes/user.router';
import routerBuildings from './entities/routes/buldings.router';
import routerInstitutions from './entities/routes/departmentsAcademics.router/institutions.router';
import routerDpto_academics from './entities/routes/departmentsAcademics.router/departmentsAcademics.router';
import routerTeachers from './entities/routes/departmentsAcademics.router/teacher.router';
import routerPrograms from './entities/routes/departmentsAcademics.router/programs.router';
import routeEmployees from './entities/routes/departmentsAcademics.router/employees.router';
import routeClassrooms from './entities/routes/academic_services.router/classrooms.router';
import routeLaboratory from './entities/routes/academic_services.router/laboratories.router';
import routeCourses from './entities/routes/academic_services.router/courses.router';
import routeSubjects from './entities/routes/academic_services.router/subjects.router';
import routeStudents from './entities/routes/students_services.router/students.router';
// import routerHousing from './entities/routes/housing.router';
// import routerMascot from './entities/routes/mascots.router';
// import routerCars from './entities/routes/cars.router';
// import routerDiseases from './entities/routes/disease.router';
// // import routerRolocations from './entities/routes/relocations.router';
// import routerUserHouseholds from './entities/routes/userHouseholds.router';
// import routerImages from './entities/routes/imagens.router';
// import routerNews from './entities/routes/news.router';
// import routerNewsImages from './entities/routes/newsImagens.router'
import routerPDF from './reports/routes/pdf.router'
import googleAuthRoutes from './controllers/googleAuthRoutes';

const mainRouter = Router();

mainRouter.use('/', routerController);
mainRouter.use('/auth', googleAuthRoutes)
mainRouter.use('/users', routerUsers);
mainRouter.use('/buildings', routerBuildings);
mainRouter.use('/pdfs', routerPDF);
mainRouter.use('/institution', routerInstitutions);
mainRouter.use('/dpto_academics', routerDpto_academics);
mainRouter.use('/teachers', routerTeachers);
mainRouter.use('/programs', routerPrograms);
mainRouter.use('/employees', routeEmployees);
mainRouter.use('/classrooms', routeClassrooms);
mainRouter.use('/laboratories', routeLaboratory);
mainRouter.use('/courses', routeCourses);
mainRouter.use('/subjects', routeSubjects);
mainRouter.use('/students', routeStudents);
// mainRouter.use('/housing', routerHousing);
// mainRouter.use('/mascots', routerMascot);
// mainRouter.use('/cars', routerCars);
// mainRouter.use('/diseases', routerDiseases);
// // mainRouter.use('/relocations', routerRolocations);
// mainRouter.use('/userApartments', routerUserHouseholds);
// mainRouter.use('/images', routerImages);
// mainRouter.use('/news', routerNews);
// mainRouter.use('/newsImages', routerNewsImages);

export default mainRouter;