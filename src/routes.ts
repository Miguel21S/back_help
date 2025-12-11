
import { Router } from 'express';
import routerController from './controllers/router';
import routerUsers from './entities/routes/user.router';
import routerBuildign from './entities/routes/buldings.router';
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
mainRouter.use('/buildings', routerBuildign);
mainRouter.use('/pdfs', routerPDF);
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