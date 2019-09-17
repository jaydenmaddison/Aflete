import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button, Platform, BlurView, View } from "react-native";
import Splash from "./screens/Splash";
import Start from "./screens/Start";
import Login from "./screens/login/Login";
import EmailEntry from "./screens/login/EmailEntry";
import SelectVendor from "./screens/login/SelectVendor";
import Home from "./screens/products/Home";
import ProductNotes from "./screens/products/ProductNotes";
// Workout specific routes
import WorkoutMain from "./screens/products/workout/WorkoutMain";
import WorkoutSession from "./screens/products/workout/WorkoutSession";
import WorkoutWeek from "./screens/products/workout/WorkoutWeek";
import WorkoutDay from "./screens/products/workout/WorkoutDay";
import ExerciseDetails from "./screens/products/workout/ExerciseDetails";
// Ebook specific routes
import EbookMain from "./screens/products/ebook/EbookMain";
// Videos specific routes
import VideoMain from "./screens/products/video/VideoMain";

import Profile from "./screens/settings/Profile";
import ForgotPassword from "./screens/ForgotPassword";
import Settings from "./screens/settings/Settings";

const Project = createStackNavigator(
  {
    Splash: {
      screen: Splash
    },
    Start: {
      screen: Start
    },
    Login: {
      screen: Login
    },
    EmailEntry: {
      screen: EmailEntry
    },
    SelectVendor: {
      screen: SelectVendor
    },
    // Login: {
    //   screen: Login,
    //   path: "passwordless/:token"
    // },
    Products: {
      screen: Home
    },
    ProductNotes: {
      screen: ProductNotes
    },
    WorkoutMain: {
      screen: WorkoutMain
    },
    WorkoutSession: {
      screen: WorkoutSession
    },
    WorkoutWeek: {
      screen: WorkoutWeek
    },
    ExerciseDetails: {
      screen: ExerciseDetails
    },
    WorkoutDay: {
      screen: WorkoutDay
    },

    VideoMain: {
      screen: VideoMain
    },

    EbookMain: {
      screen: EbookMain
    },

    ForgotPassword: {
      screen: ForgotPassword
    },
    Profile: {
      screen: Profile
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Splash",
    // headerMode:'none',
    // mode:'modal'
    // headerMode: "none",
    // headerTitle: <Header />,
    // transparentCard: true,
    // cardStyle: { opacity: 1 }
    // cardStyle: {
    //   backgroundColor: "transparent",
    //   opacity: 1
    // },
    // transitionConfig: () => ({
    //   containerStyle: {
    //     backgroundColor: "transparent",
    //     opacity: 1
    //   }
    // })
    // headerRight: (
    //   <Button
    //     onPress={() => alert("This is a button!")}
    //     title="Info"
    //     color="#fff"
    //   />
    // )
    // headerTransitionPreset: "uikit",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0665a0",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitle: "AFLETE",
      // headerTransparent: true,
      headerTintColor: "#FFFFFF",
      headerBackTitle: null,
      headerTitleStyle: {
        // fontWeight: "bold",
        color: "#ffffff",
        fontSize: 15
      },
      headerForceInset: { top: "never", bottom: "never" }
    }
  }
);
export default createAppContainer(Project);
