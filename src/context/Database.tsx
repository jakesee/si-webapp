import { IDatabase } from "../interfaces/data";
import { ITheme } from "../interfaces/ui";

export const Database: IDatabase = {
     // will be populated randomly on init
    appointments: [], users: [], episodes: [],
    casenotes: [], casenoteRevisions: [],
    prescriptions: [], referrals: [], medicalCertificates: [], icd10: [],

    // define providers
    providers: [
        {
            "id": 0,
            "parentId": 1,
            "order": 0,
            "title": "MyDoc",
            "logoUrl": "logo_my_doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {}
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo_my_doc.png",
                        "title": "MyDoc",
                        "blob": "Broccoli avocado basil pesto mediterranean vegetables crumbled lentils sriracha pecans seeds Thai butternut mix cool cucumbers fresh burritos samosa sparkling pomegranate punch habanero golden coriander."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": {}
                }
            ]
        },
        {
            "id": 1,
            "parentId": 1,
            "order": 0,
            "title": "Dai_ichi Life",
            "logoUrl": "logo_daiichi_life.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Insurer",
            "isMemberRequired": true,
            "doctorIds": [],
            "sections": [
                {
                    "component": "ConsultNowComponent",
                    "config": {
                        "imgSource":"https://app.qa.my_doc.com/dai_ichi/assets/images/Banner_happy_family.png",
                        "title": "Awesome Co. Virtual Teleheath",
                        "subText": "Operational Hours: 0800H _ 2200H, including weekend and holidays",
                        "buttonText": "Talk to Doctor Now!",
                        "command": ["journey", "start"]
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo_daiichi_life.png",
                        "title": "Dai_ichi Life",
                        "blob": "Broccoli avocado basil pesto mediterranean vegetables crumbled lentils sriracha pecans seeds Thai butternut mix cool cucumbers fresh burritos samosa sparkling pomegranate punch habanero golden coriander."
                    }
                },
                {
                    "component": "BannerSectionComponent",
                    "config": {}
                }
            ],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Talk to a doctor now!",
                    "cmdCancel": ["/patient/provider/1"],
                    "cmdSuccess": ["/patient/waiting_room"],
                    "sequence": [
                        {
                            "stepName": "Validate Membership",
                            "component": "ProviderEligibilityFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Check Time",
                            "component": "NextAppointmentInfoFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 2,
            "parentId": 1,
            "order": 0,
            "title": "BaoViet Virtual Clinic",
            "logoUrl": "logo_baoviet.png",
            "description": "Morning smoothie bowl tofu soy milk lentils dessert raspberry fizz naga viper main course Thai basil curry blueberry chia seed jam leek bento box.",
            "category": "Insurer",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "https://scontent.fsin7_1.fna.fbcdn.net/v/t1.6435_9/s960x960/232491861_6805028339523453_4862348356804023918_n.jpg?_nc_cat=111&ccb=1_5&_nc_sid=e3f864&_nc_ohc=PxtG7PqIciYAX8Mnal7&_nc_ht=scontent.fsin7_1.fna&oh=d0bb9734911911fe017ef3300e7fdce5&oe=6168CDC9"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo_baoviet.png",
                        "title": "BaoViet Life Insurance",
                        "blob": "Morning smoothie bowl tofu soy milk lentils dessert raspberry fizz naga viper main course Thai basil curry blueberry chia seed jam leek bento box."
                    }
                },
                {
                    "component": "OnetwothreeSectionComponent",
                    "config": {}
                },
                {
                    "component": "ConsultNowComponent",
                    "config": {
                        "imgSource": "https://app.qa.my_doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                        "title": "Awesome Co. Virtual Teleheath",
                        "subText": "Operational Hours: 0800H - 2200H, including weekend and holidays",
                        "buttonText": "Talk to Doctor Now!",
                        "command": ["journey", "start"]
                    }
                }
            ],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Book appointment with GP!",
                    "cmdCancel": ["/patient/provider/2"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 3,
            "parentId": 0,
            "order": 0,
            "title": "Aetna International",
            "description": "Sicilian pistachio pesto spiced pumpkin chili. Tabasco pepper apricot plums basil portobello mushrooms spring peanut butter peach strawberry mango sparkling.",
            "logoUrl": "logo-aetna.png",
            "category": "Insurer",
            "isMemberRequired": true,
            "doctorIds": [],
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-aetna.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-aetna.png",
                        "title": "Aetna International",
                        "blob": "Bananas strawberry spinach salad cozy butternut leek edamame hummus garlic sriracha noodles green papaya salad tofu quinoa flatbread zesty tofu pad thai spicy smoked tofu burritos roasted brussel sprouts blood orange smash lime mango crisp Bolivian rainbow pepper. Crispy ghost pepper Chinese five-spice powder salty cherry bomb tahini drizzle miso turmeric glazed aubergine shiitake mushrooms dill red curry tofu noodles morning smoothie bowl. Thai dragon pepper red pepper cool cucumbers crumbled lentils bento box avocado basil pesto seitan lemon tahini dressing banana bread hemp seeds macadamia nut cookies red lentil curry sandwiches Thai curry sesame soba noodles lingonberry."
                    }
                },
                {
                    "component": "SymptomsSectionComponent",
                    "config": {}
                },
                {
                    "component": "OnetwothreeSectionComponent",
                    "config": {}
                },
                {
                    "component": "ConsultNowComponent",
                    "config": {
                        "imgSource": "https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                        "title": "Awesome Co. Virtual Teleheath",
                        "subText": "Operational Hours: 0800H - 2200H, including weekend and holidays",
                        "buttonText": "Talk to Doctor Now!",
                        "command": [
                            "journey",
                            0
                        ]
                    }
                }
            ]
        },

        {
            "id": 4,
            "parentId": 0,
            "order": 0,
            "title": "Allianz Partners",
            "description": "Delightful blueberry scones quinoa flatbread couscous cozy butternut green pepper cool off garlic sriracha noodles grapefruit peanut butter crunch spicy miso dressing hearts of palm summer fruit salad.",
            "logoUrl": "logo-allianz.png",
            "isMemberRequired": true,
            "doctorIds": [],
            "category": "Insurer",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-allianz.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-allianz.png",
                        "title": "Allianz Partners",
                        "blob": "Bananas strawberry spinach salad cozy butternut leek edamame hummus garlic sriracha noodles green papaya salad tofu quinoa flatbread zesty tofu pad thai spicy smoked tofu burritos roasted brussel sprouts blood orange smash lime mango crisp Bolivian rainbow pepper. Crispy ghost pepper Chinese five-spice powder salty cherry bomb tahini drizzle miso turmeric glazed aubergine shiitake mushrooms dill red curry tofu noodles morning smoothie bowl. Thai dragon pepper red pepper cool cucumbers crumbled lentils bento box avocado basil pesto seitan lemon tahini dressing banana bread hemp seeds macadamia nut cookies red lentil curry sandwiches Thai curry sesame soba noodles lingonberry."
                    }
                },
            ]
        },
        {
            "id": 5,
            "parentId": 0,
            "order": 0,
            "title": "Prudential",
            "description": "Hazelnut shiitake mediterranean roasted brussel sprouts hummus falafel bowl bite sized heat couscous cherry bomb cherries Thai curry mangos basil hearts of palm cinnamon mediterranean vegetables shiitake mushrooms lychee.",
            "logoUrl": "logo-prudential.png",
            "isMemberRequired": true,
            "doctorIds": [],
            "category": "Insurer",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-prudential.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-prudential.png",
                        "title": "Prudential",
                        "blob": "Bananas strawberry spinach salad cozy butternut leek edamame hummus garlic sriracha noodles green papaya salad tofu quinoa flatbread zesty tofu pad thai spicy smoked tofu burritos roasted brussel sprouts blood orange smash lime mango crisp Bolivian rainbow pepper. Crispy ghost pepper Chinese five-spice powder salty cherry bomb tahini drizzle miso turmeric glazed aubergine shiitake mushrooms dill red curry tofu noodles morning smoothie bowl. Thai dragon pepper red pepper cool cucumbers crumbled lentils bento box avocado basil pesto seitan lemon tahini dressing banana bread hemp seeds macadamia nut cookies red lentil curry sandwiches Thai curry sesame soba noodles lingonberry."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": { }
                },
            ]
        },
        {
            "id": 6,
            "parentId": 0,
            "order": 0,
            "title": "Nutriwell",
            "description": "Italian linguine puttanesca Thai super chili burritos summer fruit salad enchiladas farro platter winter quinoa flatbread basmati banana bread simmer peaches.",
            "logoUrl": "logo-nutriwell.png",
            "isMemberRequired": false,
            "doctorIds": [],
            "category": "Clinic",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-allianz.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-allianz.png",
                        "title": "Allianz Partners",
                        "blob": "Bananas strawberry spinach salad cozy butternut leek edamame hummus garlic sriracha noodles green papaya salad tofu quinoa flatbread zesty tofu pad thai spicy smoked tofu burritos roasted brussel sprouts blood orange smash lime mango crisp Bolivian rainbow pepper. Crispy ghost pepper Chinese five-spice powder salty cherry bomb tahini drizzle miso turmeric glazed aubergine shiitake mushrooms dill red curry tofu noodles morning smoothie bowl. Thai dragon pepper red pepper cool cucumbers crumbled lentils bento box avocado basil pesto seitan lemon tahini dressing banana bread hemp seeds macadamia nut cookies red lentil curry sandwiches Thai curry sesame soba noodles lingonberry."
                    }
                },
            ]
        },
        {
            "id": 7,
            "parentId": 0,
            "order": 0,
            "title": "Dr. Tan and Partners",
            "description": "Arugula salad red pepper coconut chili pepper cocoa lime ginger lemongrass agave green tea paprika elderberry vegan eating together tahini drizzle portobello mushrooms entree pesto figs double dark chocolate avocado blackberries with Mexican fiesta.",
            "logoUrl": "logo-dtap.png",
            "isMemberRequired": false,
            "doctorIds": [],
            "category": "Clinic",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-dtap.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-dtap.png",
                        "title": "Allianz Partners",
                        "blob": "Arugula salad red pepper coconut chili pepper cocoa lime ginger lemongrass agave green tea paprika elderberry vegan eating together tahini drizzle portobello mushrooms entree pesto figs double dark chocolate avocado blackberries with Mexican fiesta."
                    }
                },
            ]
        },
        {
            "id": 8,
            "parentId": 0,
            "order": 0,
            "title": "Raffles Medical Group",
            "description": "Veggie burgers smoky maple tempeh glaze samosa Italian pepperoncini Caribbean red habanero plums tabasco pepper ginger carrot spiced juice cherry lingonberry appetizer sweet potato.",
            "logoUrl": "logo-raffles-medical-group.png",
            "isMemberRequired": true,
            "doctorIds": [],
            "category": "Clinic",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-dtap.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-raffles-medical-group.png",
                        "title": "Allianz Partners",
                        "blob": "Arugula salad red pepper coconut chili pepper cocoa lime ginger lemongrass agave green tea paprika elderberry vegan eating together tahini drizzle portobello mushrooms entree pesto figs double dark chocolate avocado blackberries with Mexican fiesta."
                    }
                },
            ]
        },
        {
            "id": 9,
            "parentId": 0,
            "order": 0,
            "title": "Mount Elizabeth",
            "description": "Balsamic vinaigrette green onions macadamia nut cookies cremini mushrooms cherry bomb pepper green papaya salad crunchy chai tea crispy iceberg lettuce.",
            "logoUrl": "logo-mount-elizabeth.png",
            "isMemberRequired": true,
            "doctorIds": [],
            "category": "Specialist",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-mount-elizabeth.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-mount-elizabeth.png",
                        "title": "Mount Elizabeth",
                        "blob": "Balsamic vinaigrette green onions macadamia nut cookies cremini mushrooms cherry bomb pepper green papaya salad crunchy chai tea crispy iceberg lettuce."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": {}
                }
            ]
        },
        {
            "id": 10,
            "parentId": 0,
            "order": 0,
            "title": "Guardian",
            "description": "Chinese five-spice powder red amazon pepper lemon maple orange tempeh dark and stormy cinnamon toast thyme grapefruit.",
            "logoUrl": "logo-guardian.png",
            "isMemberRequired": false,
            "doctorIds": [],
            "category": "Pharmacy",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-dtap.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-guardian.png",
                        "title": "Guardian",
                        "blob": "Chinese five-spice powder red amazon pepper lemon maple orange tempeh dark and stormy cinnamon toast thyme grapefruit."
                    }
                },
            ]
        },
        {
            "id": 11,
            "parentId": 0,
            "order": 0,
            "title": "Watsons",
            "description": "Almond milk avocado dressing drizzle black beans banana lavender lemonade oranges tasty crispy seitan cool cucumbers.",
            "logoUrl": "logo-watsons.png",
            "isMemberRequired": false,
            "doctorIds": [],
            "category": "Pharmacy",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-watsons.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-watsons.png",
                        "title": "Guardian",
                        "blob": "Almond milk avocado dressing drizzle black beans banana lavender lemonade oranges tasty crispy seitan cool cucumbers."
                    }
                },
            ]
        },
        {
            "id": 12,
            "parentId": 9,
            "order": 0,
            "title": "Mental Health",
            "description": "Kung pao pepper green pepper springtime strawberry hemp seeds bruschetta tahini drizzle red amazon pepper potato fig arugula cashew salad artichoke hearts cool cucumbers blackberries raspberry fizz dragon fruit portobello mushrooms.",
            "logoUrl": "logo-mental-health.png",
            "isMemberRequired": true,
            "doctorIds": [],
            "category": "Specialist",
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Find a Counsellor",
                    "cmdCancel": ["/patient/provider/12"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Validate Membership",
                            "component": "ProviderEligibilityFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Check Time",
                            "component": "NextAppointmentInfoFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 13,
            "parentId": 9,
            "order": 0,
            "title": "Women's Clinic",
            "description": "Peanut butter cozy cinnamon oatmeal lemon lime minty winter Bulgarian carrot sweet potato black bean burrito lemon red lentil soup red curry tofu noodles crispy spicy.",
            "logoUrl": "logo-womens-health.png",
            "isMemberRequired": true,
            "doctorIds": [],
            "category": "Specialist",
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Wellness starts here.",
                    "cmdCancel": ["/patient/provider/13"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Validate Membership",
                            "component": "ProviderEligibilityFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Check Time",
                            "component": "NextAppointmentInfoFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 14,
            "parentId": 0,
            "order": 0,
            "title": "MyDoc",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {}
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-my-doc.png",
                        "title": "MyDoc",
                        "blob": "Broccoli avocado basil pesto mediterranean vegetables crumbled lentils sriracha pecans seeds Thai butternut mix cool cucumbers fresh burritos samosa sparkling pomegranate punch habanero golden coriander."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": {}
                }
            ]
        },
        {
            "id": 15,
            "parentId": 14,
            "order": 0,
            "title": "MyDoc GP Clinic",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Talk to a doctor now!",
                    "cmdCancel": ["/patient/provider/15"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Medical Profile",
                            "component": "MedicalProfileFormComponent",
                            "config": {
                                "title": "Please confirm your medical profile"
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 16,
            "parentId": 14,
            "order": 0,
            "title": "MyDoc Health Screening",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Book Health Screening Appointment",
                    "cmdCancel": ["/patient/provider/16"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 17,
            "parentId": 5,
            "order": 0,
            "title": "Health Screening Appointment",
            "logoUrl": "logo-my-doc.png",
            "description": "Arugula salad sweet potato delightful blueberry scones chai tea Caribbean red habanero chilies hummus falafel bowl coconut salty cilantro bruschetta",
            "category": "Clinic",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [],
            "journey": {
                "start": {
                    "auth": false,
                    "label": "Book Appointment",
                    "cmdCancel": ["/patient/provider/17"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            stepName: "Terms & Conditions",
                            component: "HtmlFormComponent",
                            config: {
                                title: "Terms and Conditions",
                                html: `<p>As a Prudential PRUExtra Premier, PRUExtra Premier CoPay or PRUExtra Preferred CoPay policyholder, you can easily book your MyDoc Health Screening appointment without leaving the comfort of your home.</p>
<p>Please fill in your details and our team will get in touch with you soon</p>
<p>Do note that you are only allowed to register once. If you have any questions or encounter issues, please contact us at <strong>support@my-doc.com</strong> for assistance.
<ul><strong>Terms and Conditions</strong>
	<li>Please present your PRUPanel Connect eCard and Identity card for verification and identification.</li>
	<li>Full payment is required via Credit Card, PayNow or Bank transfer to MyDoc at least five (5) working days prior to the date of health screening/vaccination appointment.</li>
	<li>Each patient is allowed to reschedule their appointment up to two (2) times within the validity period. The request must be made at least three (3) working days before the date of appointment by emailing to MyDoc at support@my-doc.com.</li>
	<li>The health screening package is valid for three (3) months from the date that payment is received by MyDoc</li>
	<li>Patients may cancel their booking if payment has not been made to MyDoc. No refund is allowed in case of cancellation of appointment after payment is made to MyDoc or in case of a "No Show" on the date/time of appointment.</li>
	<li>All prices are inclusive of GST</li>
</ul>

<p><strong>Disclaimer</strong></p>
<p>Prudential makes no warranty or representation regarding the quality or fitness for purpose of the services provided by MyDoc. Any questions about the aforementioned must be addressed directly with MyDoc. Please contact MyDoc at support@my-doc.com for any questions regarding its content.</p>`
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "SelectAccountFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 18,
            "parentId": 5,
            "order": 0,
            "title": "Health Report Consultation",
            "logoUrl": "logo-my-doc.png",
            "description": "Fig arugula cashew salad almond milk guacamole lemon picnic salad macadamia nut cookies seeds dessert smoky maple tempeh glaze street style Thai basil tacos summer fruit salad",
            "category": "Clinic",
            "isMemberRequired": false,
            "doctorIds": [],
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Book Report Review Appointment",
                    "cmdCancel": ["/patient/provider/18"],
                    "cmdSuccess": ["/patient/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        }
    ]
}

export const Theme: ITheme = {
    "button_primary_background_color": "#65C8D0",
    "button_primary_foreground_color": "#ffffff",
    "button_secondary_background_color": "#DEDFE0",
    "button_secondary_foreground_color": "rgb(51, 51, 51)",
    "font_family": "",
    "color_background": "",
    "color_on_background": "",
    "color_surface": "",
    "color_on_surface": "",
    "color_neutral__2": "",
    "color_neutral__1": "",
    "color_neutral_0": "",
    "color_neutral_1": "",
    "color_neutral_2": "",
    "color_on_neutral__2": "",
    "color_on_neutral__1": "",
    "color_on_neutral_0": "",
    "color_on_neutral_1": "",
    "color_on_neutral_2": "",
    "color_primary__2": "",
    "color_primary__1": "",
    "color_primary_0": "",
    "color_primary_1": "",
    "color_primary_2": "",
    "color_on_primary__2": "",
    "color_on_primary__1": "",
    "color_on_primary_0": "",
    "color_on_primary_1": "",
    "color_on_primary_2": "",
    "color_secondary__2": "",
    "color_secondary__1": "",
    "color_secondary_0": "",
    "color_secondary_1": "",
    "color_secondary_2": "",
    "color_on_secondary__2": "",
    "color_on_secondary__1": "",
    "color_on_secondary_0": "",
    "color_on_secondary_1": "",
    "color_on_secondary_2": "",
    "header_background_color": "",
    "footer_background_color": "",
    "box_border_radius": "",
    "error_border_color": "",
    "error_background_color": "",
    "error_foreground_color": "",
    "warning_border_color": "",
    "warning_background_color": "",
    "warning_foreground_color": "",
    "info_border_color": "",
    "info_background_color": "",
    "info_foreground_color": "",
    "note_border_color": "",
    "note_background_color": "",
    "note_foreground_color": "",
    "success_border_color": "",
    "success_background_color": "",
    "success_foreground_color": "",
    "button_border_radius": "",
    "button_primary_border_color": "",
    "button_secondary_border_color": "",
    "button_primary_inactive_border_color": "",
    "button_primary_inactive_background_color": "",
    "button_primary_inactive_foreground_color": "",
    "button_secondary_inactive_border_color": "",
    "button_secondary_inactive_background_color": "",
    "button_secondary_inactive_foreground_color": ""
}




