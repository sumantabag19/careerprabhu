import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Layouts/landingpagelayouts/sidebar/sidebar.component';
import { HeaderComponent } from './Layouts/landingpagelayouts/header/header.component';
import { LoginManager } from './Layouts/adminpanel/Login/login.component';
import { InternetConectivityCheckComponent } from './Layouts/adminpanel/internetconnectivity/internetconnectivity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from "ngx-tooltip";
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { AuthguardService } from './AuthGuard.Service';
import { SubscriptionManager } from './Layouts/adminpanel/Subscription/subscription.component';
import { WebinarManager } from './Layouts/adminpanel/Webinar/webinar.component';
import { PlannedaActivityManager } from './Layouts/adminpanel/plannedactivity/plannedactivity.component';
import { RepositoryManager } from './Layouts/adminpanel/ssrepository/ssrepository.component';
import { SummerSchoolManager } from './Layouts/adminpanel/summerschool/summerschool.component';
import { MaterialModule } from './material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { personalessaymanager } from './Layouts/adminpanel/personalessay/personalessay.component';
import { portfoliomanager } from './Layouts/adminpanel/portfolio/portfolio.component';
import { lifecoachesmanager } from './Layouts/adminpanel/lifecoaches/lifecoaches.component';
import { prepratorymaterialManager } from './Layouts/adminpanel/prepratorymaterial/prepratorymaterial.component';
import { uploadmaterialmanager } from './Layouts/adminpanel/uploadmaterial/uploadmaterial.component';
import { prepnameManager } from './Layouts/adminpanel/prepnamemaster/prepname.component';
import { EmbedVideo } from 'ngx-embed-video';
import { SafePipeModule } from 'safe-pipe';
import { SafePipe } from './Layouts/adminpanel/plannedactivity/plannedactivity.component';
import { SummerTopicManager } from './Layouts/adminpanel/summerschooltopic/summertopic.component';
import { UniversityManager } from './Layouts/adminpanel/universitymaster/universitymaster.component';
import { SampleEssayManager } from './Layouts/adminpanel/sampleessay/sampleessay.component';
import { professionalManager } from './Layouts/adminpanel/professionalmaster/professionalmaster.component';
import { TraitManager } from './Layouts/adminpanel/traitmaster/traitmaster.component';
import { SamplePortfolioManager } from './Layouts/adminpanel/sampleportfolio/sampleportfolio.component';
import { SOPIntrestManager } from './Layouts/adminpanel/SOPintrestmaster/sopintrestmaster.component';
import { SampleSOPManager } from './Layouts/adminpanel/samplesop/samplesop.component';
import { professionalSOPManager } from './Layouts/adminpanel/professionalsop/professionalsop.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LifeCoachManager } from './Layouts/adminpanel/lifecoachtopic/lifecoachtopic.component';
import { WelcomeManager } from './Layouts/adminpanel/welcompage/welcome.component';
import { videopdfmanager } from './Layouts/adminpanel/uploadvideopdf/uploadvideopdf.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';
import { SearchfilterPipe } from './Layouts/adminpanel/uploadvideopdf/filtergrid';
import { SearchSummerfilterPipe } from './Layouts/adminpanel/summerschool/filtersummerschoolgrid';
//import { SearchsampleessayfilterPipe } from './Layouts/adminpanel/sampleessay/sampleessaygrid';

import { lifecoachactivitymanager } from './Layouts/adminpanel/lifecoachactivity/lifecoachactivity.component';
import { EntranceExamManager } from './Layouts/adminpanel/entranceexam/entranceexam.component';
import { PlacementStudentManager } from './Layouts/adminpanel/studentplacement/placement.component';
import { AddPlacementManager } from './Layouts/adminpanel/placement/placement.component';
import { PrincipalRegistration } from './Layouts/adminpanel/principalregistration/principalregistration.component';
import { Selfanalysis } from './Layouts/adminpanel/selfanalysis/selfanalysis.component';
import { couponmaster } from './Layouts/adminpanel/couponmaster/couponmaster.component';
import { partnerregistration } from './Layouts/adminpanel/partner/partner.component';
import { PaidFeaturemanager } from './Layouts/adminpanel/paidfeature/paidfeature.component';
import { addstudent } from './Layouts/adminpanel/addstudent/addstudent.component';
import { Partnerbankdetail } from './Layouts/adminpanel/partnerbankdetail/partnerbankdetail.component';
import { resetpassword } from './Layouts/adminpanel/resetpassword/resetpassword.component';
import { guideline } from './Layouts/adminpanel/guideline/guideline.component';
import { collegerepository } from './Layouts/adminpanel/collegerepository/collegerepository.component';
import { paidfeaturebackend } from './Layouts/adminpanel/paidfeaturebackend/paidfeaturebackend.component';
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
//import { NgxSpinnerModule } from "ngx-spinner";
import { LiveWebinarManager } from './Layouts/adminpanel/livewebinar/livewebinar.component';
import { permissionmanager } from './Layouts/adminpanel/permission/permission.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginManager,
    InternetConectivityCheckComponent,
    SubscriptionManager,
    WebinarManager,
    PlannedaActivityManager,
    RepositoryManager,
    SummerSchoolManager,
    personalessaymanager,
    portfoliomanager,
    lifecoachesmanager,
    prepratorymaterialManager,
    uploadmaterialmanager,
    prepnameManager,
        SafePipe, SummerTopicManager, UniversityManager,
        SampleEssayManager, professionalManager, TraitManager,
        SamplePortfolioManager, SOPIntrestManager, SampleSOPManager,
        professionalSOPManager, LifeCoachManager, WelcomeManager,
    videopdfmanager, SearchfilterPipe, SearchSummerfilterPipe, lifecoachactivitymanager, EntranceExamManager, PlacementStudentManager,
    AddPlacementManager, PrincipalRegistration, Selfanalysis, couponmaster, partnerregistration, PaidFeaturemanager, addstudent,
    Partnerbankdetail, resetpassword, guideline, collegerepository, paidfeaturebackend, boards, citymaster, statemaster,
    lifecoachtypemaster, lifecoachagenda, lifecoachinformation, lifecoachesinfo, productusagemanager, ProductManager, ReportManager, countrymaster,
    ProductCoupon, LiveWebinarManager, permissionmanager

  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    TooltipModule,
    LocalStorageModule.forRoot({
      prefix: '',
      storageType: 'localStorage'
    }),
    ToastrModule.forRoot(),
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    EmbedVideo.forRoot(),
    SafePipeModule,
      AngularEditorModule, ClipboardModule, NgxMaterialTimepickerModule
   
    
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
