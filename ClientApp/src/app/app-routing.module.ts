import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginManager } from './Layouts/adminpanel/Login/login.component';
import { InternetConectivityCheckComponent } from './Layouts/adminpanel/internetconnectivity/internetconnectivity.component';
import { SidebarComponent } from './Layouts/landingpagelayouts/sidebar/sidebar.component';
import { HeaderComponent } from './Layouts/landingpagelayouts/header/header.component';
import { AuthguardService } from './AuthGuard.Service';
import { SubscriptionManager } from './Layouts/adminpanel/Subscription/subscription.component';
import { WebinarManager } from './Layouts/adminpanel/Webinar/webinar.component';
import { PlannedaActivityManager } from './Layouts/adminpanel/plannedactivity/plannedactivity.component';
import { RepositoryManager } from './Layouts/adminpanel/ssrepository/ssrepository.component';
import { SummerSchoolManager } from './Layouts/adminpanel/summerschool/summerschool.component';
import { personalessaymanager } from './Layouts/adminpanel/personalessay/personalessay.component';
import { portfoliomanager } from './Layouts/adminpanel/portfolio/portfolio.component';
import { lifecoachesmanager } from './Layouts/adminpanel/lifecoaches/lifecoaches.component';
import { prepratorymaterialManager } from './Layouts/adminpanel/prepratorymaterial/prepratorymaterial.component';
import { uploadmaterialmanager } from './Layouts/adminpanel/uploadmaterial/uploadmaterial.component';
import { prepnameManager } from './Layouts/adminpanel/prepnamemaster/prepname.component';
import { SummerTopicManager } from './Layouts/adminpanel/summerschooltopic/summertopic.component';
import { UniversityManager } from './Layouts/adminpanel/universitymaster/universitymaster.component';
import { SampleEssayManager } from './Layouts/adminpanel/sampleessay/sampleessay.component';
import { professionalManager } from './Layouts/adminpanel/professionalmaster/professionalmaster.component';
import { TraitManager } from './Layouts/adminpanel/traitmaster/traitmaster.component';
import { SamplePortfolioManager } from './Layouts/adminpanel/sampleportfolio/sampleportfolio.component';
import { SOPIntrestManager } from './Layouts/adminpanel/SOPintrestmaster/sopintrestmaster.component';
import { SampleSOPManager } from './Layouts/adminpanel/samplesop/samplesop.component';
import { professionalSOPManager } from './Layouts/adminpanel/professionalsop/professionalsop.component';
import { LifeCoachManager } from './Layouts/adminpanel/lifecoachtopic/lifecoachtopic.component';
import { WelcomeManager } from './Layouts/adminpanel/welcompage/welcome.component';
import { videopdfmanager } from './Layouts/adminpanel/uploadvideopdf/uploadvideopdf.component';

import { lifecoachactivitymanager } from './Layouts/adminpanel/lifecoachactivity/lifecoachactivity.component';
import { EntranceExamManager } from './Layouts/adminpanel/entranceexam/entranceexam.component';
import { PlacementStudentManager } from './Layouts/adminpanel/studentplacement/placement.component';
import { AddPlacementManager } from './Layouts/adminpanel/placement/placement.component';
import { PrincipalRegistration } from './Layouts/adminpanel/principalregistration/principalregistration.component';
import { Selfanalysis } from './Layouts/adminpanel/selfanalysis/selfanalysis.component';
import { couponmaster } from './Layouts/adminpanel/couponmaster/couponmaster.component';
import { partnerregistration } from './Layouts/adminpanel/partner/partner.component';
import { PaidFeaturemanager } from './Layouts/adminpanel/paidfeature/paidfeature.component';
import { paidfeaturebackend } from './Layouts/adminpanel/paidfeaturebackend/paidfeaturebackend.component';

import { addstudent } from './Layouts/adminpanel/addstudent/addstudent.component';
import { Partnerbankdetail } from './Layouts/adminpanel/partnerbankdetail/partnerbankdetail.component';
import { resetpassword } from './Layouts/adminpanel/resetpassword/resetpassword.component';
import { guideline } from './Layouts/adminpanel/guideline/guideline.component';
import { collegerepository } from './Layouts/adminpanel/collegerepository/collegerepository.component';
import { boards } from './Layouts/adminpanel/boards/boards.component';
import { citymaster } from './Layouts/adminpanel/citymaster/citymaster.component';
import { statemaster } from './Layouts/adminpanel/statemaster/statemaster.component';
import { lifecoachtypemaster } from './Layouts/adminpanel/lifecoachtypemaster/lifecoachtypemaster.component';
import { lifecoachagenda } from './Layouts/adminpanel/lifecoachagenda/lifecoachagenda.component';
import { lifecoachinformation } from './Layouts/adminpanel/lifecoachinformation/lifecoachinformation.component';
import { lifecoachesinfo } from './Layouts/adminpanel/lifecoachesinfo/lifecoachesinfo.component';
import { productusagemanager } from './Layouts/adminpanel/productusage/productusage.component';
import { ProductManager } from './Layouts/adminpanel/productmaster/productmaster';

import { ReportManager } from './Layouts/adminpanel/report/report.component';
import { countrymaster } from './Layouts/adminpanel/country/country.component';
import { ProductCoupon } from './Layouts/adminpanel/productwisecoupon/productwisecoupon.component';
import { LiveWebinarManager } from './Layouts/adminpanel/livewebinar/livewebinar.component';
import { permissionmanager } from './Layouts/adminpanel/permission/permission.component';


const routes: Routes =
  [
    { path: 'login' , component: LoginManager },
   
    {
      path: '', component: HeaderComponent, canActivateChild: [AuthguardService],
           children:
               [
                { path: 'WelcomeManager', component: WelcomeManager, canActivate: [AuthguardService] },
                { path: 'checkconnectivity', component: InternetConectivityCheckComponent },
                   
               { path: 'subscription', component: SubscriptionManager, canActivate: [AuthguardService] },
               { path: 'webinar', component: WebinarManager, canActivate: [AuthguardService] },
               { path: 'plannedactivity', component: PlannedaActivityManager, canActivate: [AuthguardService] },
               { path: 'LiveWebinarManager', component: LiveWebinarManager, canActivate: [AuthguardService] },

               { path: 'repositorymanager', component: RepositoryManager, canActivate: [AuthguardService] },
               { path: 'summerschool', component: SummerSchoolManager, canActivate: [AuthguardService] },
               { path: 'personalessay', component: personalessaymanager, canActivate: [AuthguardService] },
               { path: 'portfolio', component: portfoliomanager, canActivate: [AuthguardService] },
               { path: 'lifecoaches', component: lifecoachesmanager, canActivate: [AuthguardService] },
               { path: 'prepratorymaterial', component: prepratorymaterialManager, canActivate: [AuthguardService] },
               { path: 'uploadmaterial', component: uploadmaterialmanager, canActivate: [AuthguardService] },
               { path: 'prepname', component: prepnameManager, canActivate: [AuthguardService] },
               { path: 'summertopic', component: SummerTopicManager, canActivate: [AuthguardService] },
               { path: 'universitymaster', component: UniversityManager, canActivate: [AuthguardService] },
               { path: 'sampleessay', component: SampleEssayManager, canActivate: [AuthguardService] },
               { path: 'professionalmaster', component: professionalManager, canActivate: [AuthguardService] },
               { path: 'traitmaster', component: TraitManager, canActivate: [AuthguardService] },
               { path: 'SamplePortfolioManager', component: SamplePortfolioManager, canActivate: [AuthguardService] },
               { path: 'SOPIntrestManager', component: SOPIntrestManager, canActivate: [AuthguardService] },
               { path: 'SampleSOPManager', component: SampleSOPManager, canActivate: [AuthguardService] },
               { path: 'professionalSOPManager', component: professionalSOPManager, canActivate: [AuthguardService] },
                   { path: 'LifeCoachManager', component: LifeCoachManager, canActivate: [AuthguardService] },
               { path: 'videopdfmanager', component: videopdfmanager, canActivate: [AuthguardService] },
               
               { path: 'lifecoachactivitymanager', component: lifecoachactivitymanager, canActivate: [AuthguardService] },
               { path: 'EntranceExamManager', component: EntranceExamManager, canActivate: [AuthguardService] },
               { path: 'PlacementStudentManager', component: PlacementStudentManager, canActivate: [AuthguardService] },
               { path: 'AddPlacementManager', component: AddPlacementManager, canActivate: [AuthguardService] },
               { path: 'PrincipalRegistration', component: PrincipalRegistration, canActivate: [AuthguardService] },
               { path: 'Selfanalysis', component: Selfanalysis, canActivate: [AuthguardService] },
               { path: 'couponmaster', component: couponmaster, canActivate: [AuthguardService] },
               { path: 'partnerregistration', component: partnerregistration, canActivate: [AuthguardService] },
               { path: 'PaidFeaturemanager', component: PaidFeaturemanager, canActivate: [AuthguardService] },
               { path: 'paidfeaturebackend', component: paidfeaturebackend, canActivate: [AuthguardService] },

               { path: 'addstudent', component: addstudent, canActivate: [AuthguardService] },
               { path: 'Partnerbankdetail', component: Partnerbankdetail, canActivate: [AuthguardService] },
               { path: 'resetpassword', component: resetpassword, canActivate: [AuthguardService] },
               { path: 'guideline', component: guideline, canActivate: [AuthguardService] },
               { path: 'collegerepository', component: collegerepository, canActivate: [AuthguardService] },
               { path: 'boards', component: boards, canActivate: [AuthguardService] },
               { path: 'citymaster', component: citymaster, canActivate: [AuthguardService] },
               { path: 'statemaster', component: statemaster, canActivate: [AuthguardService] },
               { path: 'lifecoachtypemaster', component: lifecoachtypemaster, canActivate: [AuthguardService] },
               { path: 'lifecoachagenda', component: lifecoachagenda, canActivate: [AuthguardService] },
               { path: 'lifecoachinformation', component: lifecoachinformation, canActivate: [AuthguardService] },
               { path: 'lifecoachesinfo', component: lifecoachesinfo, canActivate: [AuthguardService] },
               { path: 'productusagemanager', component: productusagemanager, canActivate: [AuthguardService] },
               { path: 'ProductManager', component: ProductManager, canActivate: [AuthguardService] },

               { path: 'ReportManager', component: ReportManager, canActivate: [AuthguardService] },
               { path: 'countrymaster', component: countrymaster, canActivate: [AuthguardService] },

               { path: 'ProductCoupon', component: ProductCoupon, canActivate: [AuthguardService] },
               { path: 'permissionmanager', component: permissionmanager, canActivate: [AuthguardService] },


              // { path: 'LiveWebinarManager', component: LiveWebinarManager, canActivate: [AuthguardService] },


                   { path: '**', redirectTo: 'WelcomeManager' }  //For Now i give subscription but actually it would be dashboard

             ]
        },

    { path: '**', redirectTo: 'login' }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
