import { IDatabase } from "../interfaces/data";
import { AppointmentStatus, MessageType, EpisodeStatus, EpisodeType, IMessage, IEpisode, Appointment, Episode } from "../interfaces/episode";
import { IProvider } from "../interfaces/provider";
import { ConsultedFor, ICasenote, ICasenoteRevision, IIcd10 } from "../interfaces/records";
import { User, UserRole } from "../interfaces/user";
import Icd10Descriptions from './icd10_codes';

const RANDOM = {
    firstNames: ["Sarah", "Johnnie", "Wm", "Megan", "Lynn", "Andre", "Celia", "Delia", "Geoffrey", "Dora", "Fannie", "Colin", "Marlene", "Tammy", "Grady", "Lola", "Bonnie", "Luke", "Marta", "Russell", "Felix", "Kyle", "Ricardo", "Lois", "Vanessa", "Caleb", "Woodrow", "Joe", "Joel", "Christie", "Kevin", "April", "Ada", "Don", "Darnell", "Dixie", "Moses", "Guadalupe", "Marlon", "Bradley", "Blanca", "Esther", "Gail", "Laurie", "Amos", "Mitchell", "Joann", "Marsha", "Preston", "Jean", "Nick", "Antonia", "Carla", "Grant", "Shelia", "Natalie", "Sonya", "Christy", "Omar", "Jody", "Traci", "Judith", "Sherman", "Leroy", "Stacey", "Elmer", "Irene", "Guy", "Kerry", "Lawrence", "Hazel", "Karla", "Dianne", "Vincent", "Domingo", "Wilfred", "Dana", "Willie", "Misty", "Leslie", "Ken", "Lela", "Kelli", "Yvonne", "Orville", "Sonia", "Harriet", "Bernadette", "Jeannie", "Ted", "Mike", "Vivian", "Brooke", "Kara", "Zachary", "Evelyn", "Carl", "Cristina", "Candace", "Jerom"],
    lastNames: ["Perez", "Mccormick", "Turner", "Goodwin", "Logan", "Gardner", "Fletcher", "Hale", "Berry", "Zimmerman", "Wilkerson", "Ortega", "Burke", "Cunningham", "Klein", "Mullins", "Campbell", "Dawson", "Herrera", "Griffin", "Valdez", "Bowers", "Leonard", "Powers", "Ramirez", "Norris", "Alexander", "Hunter", "Moody", "Baker", "Lee", "Daniels", "Gregory", "Warner", "Fowler", "Pittman", "Webb", "Floyd", "Norton", "Murray", "Sutton", "Dean", "Barber", "Harris", "Harrington", "Marshall", "Jordan", "Hicks", "Joseph", "Garza", "Lawson", "Griffith", "Bennett", "Duncan", "Pierce", "Owen", "Swanson", "Weber", "Stone", "Gonzales", "Mckinney", "Parks", "Rice", "Castro", "Johnson", "Summers", "Holland", "Conner", "Wallace", "Weaver", "Walker", "Poole", "Gonzalez", "Jacobs", "Maxwell", "Schneider", "Ortiz", "Reyes", "Brock", "Colon", "Mills", "Harrison", "Padilla", "Baldwin", "Hogan", "Flores", "Byrd", "Frazier", "Hawkins", "Howard", "Meyer", "Morris", "Reid", "Cobb", "Allen", "Copeland", "Chapman", "Francis", "Rodriquez", "Bush"],
    gender: ["Male", "Female"],
    clinicNames: ["Blessings Community Hospital", "Meadowview Clinic", "Pine Valley Medical Clinic", "Clearview Medical Clinic", "Great Plains General Hospital", "Paradise Grove Hospital", "White Wing Hospital Center", "Specialty Medical Center", "Hill Crest General Hospital", "Olympus General Hospital", "Castle Hospital Center", "Honor Clinic", "Rainbow Clinic", "Angelvale Medical Center", "Riverside General Hospital", "White Wing Clinic", "Mineral Community Hospital", "Bayview Hospital", "Beacon Medical Center", "Principal Clinic", "Rainbow Hospital Center", "Highland Medical Clinic", "Wellness Community Hospital", "Swan River General Hospital", "White Feather Medical Center", "Griffin Hospital", "Jade Forest General Hospital", "Tranquility General Hospital", "Rose Petal General Hospital", "Summer Springs General Hospital", "Spring Harbor Medical Clinic", "Grand Mountain Community Hospital", "Lakewood Clinic", "Summerstone Hospital Center", "Evergreen Hospital Center", "Grand Valley Medical Center", "White Blossom Medical Center", "Blossom Valley Hospital Center", "Hot Springs Clinic", "Grand Meadow General Hospital", "Pearl River Clinic", "Sapphire Lake Medical Clinic", "Hill Crest Hospital", "Grand River Community Hospital", "Hope Haven Hospital Center", "North Star Hospital Center", "Good Samaritan Hospital", "Evergreen General Hospital", "Wellness Community Hospital", "Grand View Community Hospital"],
    adjectives: ["tan", "vagabond", "learned", "energetic", "capable", "gorgeous", "lush", "crazy", "rotten", "laughable", "giant", "fortunate", "recondite", "natural", "billowy", "diligent", "mysterious", "industrious", "sulky", "half", "rambunctious", "rabid", "loutish", "versed", "ashamed", "feeble", "defective", "faded", "ill-fated", "mundane", "terrific", "suitable", "roomy", "regular", "painful", "mad", "abundant", "dispensable", "two", "defiant", "skinny", "anxious", "former", "wanting", "agonizing", "troubled", "tasteless", "thankful", "breezy", "federal"],
    nouns: ["description", "employment", "map", "transportation", "agreement", "diamond", "agency", "unit", "investment", "police", "church", "hair", "movie", "delivery", "paper", "protection", "football", "person", "funeral", "tennis", "debt", "fishing", "leadership", "cell", "birthday", "engine", "member", "two", "penalty", "childhood", "departure", "emotion", "manager", "establishment", "breath", "science", "freedom", "idea", "entertainment", "fortune", "pollution", "gate", "control", "death", "confusion", "library", "attention", "election", "perspective", "literature"],
    businesses: ["Mystic Entertainment", "Apache Brews", "Mercury Corporation", "Marsoftwares", "Crowares", "Rushcorp", "Smilectronics", "Heartcast", "Tigerlife", "Cliffwood", "Hook Media", "Twilight Acoustics", "Dwarf Softwares", "Fortunetworks", "Turtletainment", "Lokilutions", "Sawwares", "Wonderhive", "Spritewalk", "Banshee Aviation", "Fjord Sports", "Goblin Brews", "Deserprises", "Grizzlimited", "Globaviations", "Wizardustries", "Foresthut", "Moonmedia", "Bansheestone", "Peachworks", "Honeydew Industries", "Hercules Industries", "Revelation Entertainment", "Raptolutions", "Greenetworks", "Prodintelligence", "Odinetworks", "Cubedale", "Spiritman", "Mountainshack", "Raptor Microsystems", "Amazon Solutions", "Turtle Motors", "Pixystems", "Asco", "Pyramidustries", "Rabbitechnologies", "Alpinepoint", "Mermaidgold", "Auradew", "Cloud Security", "Hero Entertainment", "Granitelligence", "Globaviations", "Pumpkinavigation", "Hatchworks", "Lionesspoint", "Arcanestar", "Phoenixwell"],
    speciality: ["Anaesthesiology", "Cardiology", "Cardiothoracic Surgery", "Dermatology", "Diagnostic Radiology", "Emergency Medicine", "Endocrinology", "Gastroenterology", "General Surgery", "Geriatric Medicine", "Haematology", "Hand Surgery", "Infectious Diseases", "Internal Medicine", "Medical Oncology", "Neurology", "Neurosurgery", "Nuclear Medicine", "Obstetrics & Gynaecology", "Occupational Medicine", "Ophthalmology", "Orthopaedic Surgery", "Otorhinolaryngology / ENT", "Paediatric Medicine", "Paediatric Surgery", "Pathology", "Plastic Surgery", "Psychiatry", "Public Health", "Radiation Oncology", "Rehabilitation Medicine", "Renal Medicine", "Respiratory Medicine", "Rheumatology", "Urology" ],
    sentences: [
        `I'm a great listener, really good with empathy vs sympathy and all that, but I hate people.`,
        `Lightning Paradise was the local hangout joint where the group usually ended up spending the night.`,
        `You realize you're not alone as you sit in your bedroom massaging your calves after a long day of playing tug-of-war with Grandpa Joe in the hospital.`,
        `The paintbrush was angry at the color the artist chose to use.`,
        `They throw cabbage that turns your brain into emotional baggage.`,
        `His mind was blown that there was nothing in space except space itself.`,
        `Check back tomorrow; I will see if the book has arrived.`,
        `Two more days and all his problems would be solved.`,
        `The overpass went under the highway and into a secret world.`,
        `It took him a while to realize that everything he decided not to change, he was actually choosing.`,
        `He realized there had been several deaths on this road, but his concern rose when he saw the exact number.`,
        `The balloons floated away along with all my hopes and dreams.`,
        `Today I bought a raincoat and wore it on a sunny day.`,
        `She only paints with bold colors; she does not like pastels.`,
        `When he encountered maize for the first time, he thought it incredibly corny.`,
        `He was disappointed when he found the beach to be so sandy and the sun so sunny.`,
        `She looked at the masterpiece hanging in the museum but all she could think is that her five-year-old could do better.`,
        `This book is sure to liquefy your brain.`,
        `They got there early, and they got really good seats.`,
        `They say people remember important moments in their life well, yet no one even remembers their own birth.`,
        `The elderly neighborhood became enraged over the coyotes who had been blamed for the poodle’s disappearance.`,
        `Today I dressed my unicorn in preparation for the race.`,
        `The tree fell unexpectedly short.`,
        `Siri became confused when we reused to follow her directions.`,
        `People generally approve of dogs eating cat food but not cats eating dog food.`,
        `She was the type of girl who wanted to live in a pink house.`,
        `I would be delighted if the sea were full of cucumber juice.`,
        `He picked up trash in his spare time to dump in his neighbor's yard.`,
        `She finally understood that grief was her love with no place for it to go.`,
        `Pantyhose and heels are an interesting choice of attire for the beach.`,
        `There is no better feeling than staring at a wall with closed eyes.`,
        `The beauty of the African sunset disguised the danger lurking nearby.`,
        `He strives to keep the best lawn in the neighborhood.`,
        `It must be five o'clock somewhere.`,
        `Her daily goal was to improve on yesterday.`,
        `The near-death experience brought new ideas to light.`,
        `A good example of a useful vegetable is medicinal rhubarb.`,
        `Yeah, I think it's a good environment for learning English.`,
        `The estate agent quickly marked out his territory on the dance floor.`,
        `I've never seen a more beautiful brandy glass filled with wine.`,
        `If eating three-egg omelets causes weight-gain, budgie eggs are a good substitute.`,
        `There have been days when I wished to be separated from my body, but today wasn’t one of those days.`,
        `I had a friend in high school named Rick Shaw, but he was fairly useless as a mode of transport.`,
        `She discovered van life is difficult with 2 cats and a dog.`,
        `He decided to count all the sand on the beach as a hobby.`,
        `The rain pelted the windshield as the darkness engulfed us.`,
        `I checked to make sure that he was still alive.`,
        `Everyone was busy, so I went to the movie alone.`,
        `She folded her handkerchief neatly.`,
        `It was her first experience training a rainbow unicorn.`
    ],
    countries: ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and The Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],
    places: ["Locust Grove", "Wallhausen", "Tsaratanana", "Acuitzio del", "Rivergaro", "Anse", "Jeffreyston", "Hemlock	MI", "Wiyayu Barat", "Lagata", "Shanli", "San Nicolas", "Koani Ndogo", "Moss Bluff", "Erkerode", "Tres Rios", "Hillsboro", "Zaranj", "Ciurila", "Parika", "Clehull", "Nies", "Broughblegreen", "Lakessmerebourne", "Sweke Wells", "East Westlick", "West Ters", "Grand Marshtur", "Rusgu", "Chenhailbury", "Gas View", "Digby Market", "Reservoir Banks", "Banks Lanes", "Beaulieu Passage", "Tiverton Spinney", "Stewart Warren", "Russell Crest", "Nene Crescent", "Bluebell Yard", "Glamis Covert", "Brynamman Road", "Primrose Paddocks", "Ely Ridge", "Thirlmere Elms", "Cleeve Retreat", "Edgar Laurels", "Winchester Esplanade", "Nairn Haven", "Old Mill Park", "Duncan Cliff", "St David's Gardens", "Admiral Meadow", "Willerby Carr Lane", "St Medan's Place", "Goodwood Grange", "Plough Acres", "Powell Meadow", "Balfour Downs", "Foster Ridings", "Hornbeam Maltings", "Deans Boulevard", "Primrose Brook", "County Coppice", "Wellington Walk", "Sun Glade", "Wallace Leaze", "Albert Furlong", "Old Station Ridgeway", "Abbotts Way", "Stuart Oval", "Plough North", "Muirfield Glade", "Holt Coppice", "Newtown Drove", "Lion Garden", "Horsemoor Square", "Glencoe Highway", "Ocean Gait", "Ely By-Pass", "The Merrin", "Linnet End", "St Alban's By-Pass", "Adam Point", "St Catherine's Heights", "Allington Head", "Windermere Grove", "Shelley Pastures", "Johnston Banks", "Brickfield Crest", "Dillam Close", "Water Courtyard", "Hurdwick", "St Clair Place", "Sheffield Green", "Buchanan Brae", "Trevor Hollow", "Springfield North", "Knighton Heath Close", "City Circle", "Burlington Brow", "Watson Dene", "Horton Buildings", "Mercer Holt", "Goodwood Brow", "Moorside Point", "Convent Down", "Parkfield Courtyard", "Brown Las", "Grassington Place", "Medmerry Hill", "Sixth Path", "Forbes Laurels", "Backhold Road", "Pryor Way", "Clayton Isaf", "North Farm Court", "Sovereign Gardens", "Oak Brae", "Wilton Royd", "Kipling Oval", "Paget Isaf", "Stonehill Place", "Stirling Corner", "York Brook", "Westland Way", "Staynall Lane", "Twyn Road", "Harper Common", "Pippin Avenue"],
    cities: ["Tokyo", "Delhi", "Shanghai", "São Paulo", "Mexico City", "Cairo", "Mumbai", "Beijing", "Dhaka", "Osaka", "New York", "Karachi", "Buenos Aires", "Chongqing", "Istanbul", "Kolkata", "Manila", "Rio de Janeiro", "Tianjin", "Kinshasa", "Guangzhou", "Los Angeles", "Moscow", "Shenzhen", "Lahore", "Bangalore", "Paris", "Bogotá", "Jakarta", "Chennai", "Lima", "Bangkok", "Nagoya", "Hyderabad", "London", "Tehran", "Chicago", "Chengdu", "Nanjing", "Wuhan", "Ho Chi Minh City", "Luanda", "Ahmedabad", "Kuala Lumpur", "Xi'an", "Hong Kong", "Dongguan", "Hangzhou", "Foshan", "Shenyang", "Riyadh", "Baghdad", "Santiago", "Surat", "Madrid", "Suzhou", "Pune", "Harbin", "Houston", "Dallas", "Toronto", "Dar es Salaam", "Miami", "Belo Horizonte", "Singapore", "Philadelphia", "Atlanta", "Fukuoka", "Khartoum", "Barcelona", "Saint Petersburg", "Qingdao", "Dalian", "Washington, D.C.", "Yangon", "Alexandria", "Jinan", "Guadalajara"]
}


export default class Generator {

    public static randomSentence() {
        const index = Math.floor(Math.random() * RANDOM.sentences.length)
        return RANDOM.sentences[index];
    }

    public static populateRandomData(database: IDatabase): IDatabase {

        const countPatients = this.random(5, 8);
        const countDoctors = this.random(20, 50);
        const countEpisodes = this.random(15, 30);

        const patients = [], doctors:User[] = [], appointments = [], episodes = [];

        // generate patients
        for (let i = 0; i < countPatients; i++) {
            patients.push(this.randomUser(UserRole.patient));
        }

        // generate doctors
        for (let i = 0; i < countDoctors; i++) {
            var doctor = this.randomUser(UserRole.doctor);
            doctors.push(doctor);
        }

        // fix one doctor and patient so that we can use it to login
        doctors[0].username = 'doctor';
        doctors[0].password = 'doctor';
        patients[0].id = 64329;
        patients[0].username = 'patient';
        patients[0].password = 'patient';

        // generate episodes
        for (let i = 0; i < countEpisodes; i++) {
            let episode = this.randomEpisode(patients, doctors, database.providers);
            episodes.push(episode);

            // generate appointments
            const min15 = 1000 * 60 * 15;
            const hour1 = min15 * 4;
            let appointment = this.randomAppointment();
            var milliseconds = Date.now() + hour1 * 2 - (Math.random() * min15 * i);
            appointment.episode_id = episode.id;
            appointment.start_at = new Date(milliseconds);
            appointment.end_at = new Date(milliseconds + min15);
            appointments.push(appointment);
        }

        // add doctors to providers
        database.providers.forEach(provider => {
            provider.doctorIds = provider.doctorIds.concat(this.any(doctors, this.random(5, 10)).map(doctor => doctor.id));
            // remove duplicates
            provider.doctorIds = provider.doctorIds.filter((value, index, self) => self.indexOf(value) === index);
        })





        database.appointments.push(...appointments);
        database.users.push(...patients, ...doctors);
        database.episodes.push(...episodes);

        // create case notes
        database.episodes.forEach(e => {
            if (e.type === EpisodeType.Diary) {
                const casenote = this.randomCasenote(e);
                casenote && database.casenotes.push(casenote);
            }
        });

        // create icd10 list
        database.icd10 = this.randomIcd10Codes(30, 3);

        return database;
    }

    public static random(min:number, max:number):number { // min and max inclusive
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static anyone<T>(source: T[]): T {
        return source[this.random(0, source.length - 1)];
    }

    public static any<T>(source: T[], count: number = 1): T[] {
        var result: T[] = [];

        for (var i = 0; i < count; i++) {

            result.push(this.anyone(source));
        }

        return result;
    }

    public static randomAlphabets(count: number = 1): string {
        const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        return this.any(alpha, count).join('');
    }

    public static randomDigits(count: number = 1): string {
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return this.any(digits, count).join('');
    }

    public static randomCasenote(episode: IEpisode): ICasenote | null{
        const doctor = episode.members.find(p => p.role === UserRole.doctor);
        const patient = episode.members.find(p => p.role === UserRole.patient);
        if (doctor && patient) {
            const casenote: ICasenote = {
                "id": this.random(10000, 99999),
                "episodeId": episode.id,
                "doctorId": doctor?.id,
                "patientId": patient?.id
            }
            return casenote;
        }
        return null;
    }

    public static randomCasenoteRevision(casenote: ICasenote): ICasenoteRevision {
        const revision: ICasenoteRevision = {
            "id": this.random(10000, 99999),
            "consultFor": this.random(1, 5) as ConsultedFor,
            "casenoteId": casenote.id,
            "complaints": this.randomSentence(),
            "createdAt": new Date(),
            "doctorNote": this.randomSentence(),
            "followup": new Date(),
            "gpVisit": this.anyone([true, false]),
            "patientNote": this.randomSentence(),
            "prescription": this.anyone([true, false]),
            "aeVisit": this.anyone([true, false]),
            "mydocReferred": this.anyone(['', this.randomSentence()]),
            "specialistReferred": this.anyone(['', this.randomSentence()]),
            "alliedHealthReferred": this.anyone(['', this.randomSentence()]),
        }

        return revision;
    }

    public static randomUser(role: UserRole): User {

        let firstName = this.anyone(RANDOM.firstNames);
        let lastName = this.anyone(RANDOM.firstNames);
        let domain = this.anyone(RANDOM.businesses).replace(' ', '').toLowerCase();
        let gender = this.anyone(RANDOM.gender);

        let user = new User({
            "id": this.random(10000, 99999),
            "birthdate": this.randomDate(),
            "title": this.anyone(['Mr', 'Ms', 'Mrs', 'Mdm', 'Dr', '']),
            "first_name": firstName,
            "last_name": lastName,
            "email": `${firstName}.${lastName}@${domain}.com`,
            "contact": this.random(80000000, 99999999).toString(),
            "gender": gender,
            "nationalId": this.random(10000000, 99999999).toString(),
            "password": this.anyone(RANDOM.adjectives),
            "username": this.anyone(RANDOM.nouns),
            "image_url": this.randomPortraitUrl(gender === 'Male'),
            "country": this.anyone(RANDOM.countries),
            "city": this.anyone(RANDOM.cities),
            "street": `${this.random(10, 999)} ${this.anyone(RANDOM.places)}`,
            "postal": String(this.random(100000, 999999)),
            "allergy": this.anyone(RANDOM.sentences),
            "conditions": this.anyone(RANDOM.sentences),
            "medications": Array(5).fill(0).map(i => this.anyone(RANDOM.nouns)).join(', '),
            "emergencyContact": String(this.random(10000000, 99999999)),
            "emergencyPerson": this.anyone(RANDOM.firstNames) + ' ' + this.anyone(RANDOM.lastNames),
            "role": role,
            "is_test": false,
        });

        if (role === UserRole.doctor) {
            user.title = 'Dr';
            user.clinic = this.anyone(RANDOM.clinicNames);
            user.bio = `${this.anyone(RANDOM.sentences)} ${this.anyone(RANDOM.sentences)} ${this.anyone(RANDOM.sentences)}`;
            user.speciality = this.any(RANDOM.speciality, this.random(1, 3));
            user.availability = this.randomTimeslot(new Date(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 15, 0.2)
        }

        return user;
    }

    public static randomTimeslot(from: Date, to: Date, intervalMinutes: number, availableRate: number) {
        let timeslots = [];
        let intervalInMilliseconds = intervalMinutes * 60 * 1000;
        let currentTime = from.getTime();
        let lastStartTime = to.getTime() - intervalInMilliseconds;
        while (currentTime < lastStartTime) {
            if ((this.random(0, 10000) / 10000) <= availableRate) {
                timeslots.push({
                    start: new Date(currentTime),
                    end: new Date(currentTime + intervalInMilliseconds)
                })
            }
            currentTime += intervalInMilliseconds;
        }
        return timeslots;
    }

    public static randomEpisode(patients: User[], doctors: User[], providers: IProvider[]) {

        const participants = [this.anyone(patients), this.anyone(doctors)];

        let episode = new Episode({
            "members": participants,
            "providerId": this.anyone(providers).id,
            "id": this.random(10000, 99999),
            "messages": this.randomChatHistory(participants),
            "status": (this.random(1, 10) % 2 === 0) ? EpisodeStatus.Opened : EpisodeStatus.Closed,
            "type": this.random(1, 6) as EpisodeType,
            "created_at": new Date(),
            "chat_id_username": ""
        })

        return episode;
    }

    public static randomChatHistory(participants: User[]) {

        const countMessages = this.random(3, 20);
        const startDateTime = this.randomDate(2020, 2021);
        const min15 = 1000 * 60 * 15;
        const sec10 = 1000 * 10;

        let nextDateTime = startDateTime;

        const messsages = [];
        for (let i = 0; i < countMessages; i++) {
            const message: IMessage = {
                "userId": this.anyone(participants).id,
                "message": Generator.randomSentence(),
                "datetime": nextDateTime,
                "type": MessageType.Message
            }
            nextDateTime = new Date(nextDateTime.getTime() + this.random(sec10, min15));
            messsages.push(message);
        }

        return messsages;
    }

    public static randomAppointment():Appointment {
        let appointment = new Appointment({
            "id": this.random(10000, 99999),
            "episode_id": 0,
            "start_at": new Date(),
            "end_at": new Date(),
            "status": this.random(1, 5) as AppointmentStatus,
            "created_at": new Date()
        })

        return appointment;
    }

    public static randomDate(startYear = 1959, endYear = 2002): Date {
        return new Date(
        this.random(1959, 2002),
        this.random(1, 12),
        this.random(1, 28),
        0, 0, 0, 0
        );
    }

    public static randomPortraitUrl(isMale: boolean): string {

        let id = this.random(1, 99);
        let gender = isMale ? 'men' : 'women';
        return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`
    }

    public static randomIcd10Codes(count: number, maxLevel: number, parentId: number = 0, level: number = 0): IIcd10[] {

        const codes: IIcd10[] = [];

        if (level < maxLevel) {
            for (let i = 0; i < count; i++) {
                const id = this.random(100000, 999999);
                const icd10: IIcd10 = {
                    "id": id,
                    "parentId": parentId,
                    "level": level,
                    "code": `${this.randomAlphabets().toUpperCase()}${this.randomDigits(level + 1)}`,
                    "desc": this.anyone(Icd10Descriptions),
                }

                codes.push(icd10);

                const subcodes = this.randomIcd10Codes(this.random(10, 20), maxLevel, id, level + 1)

                codes.push(...subcodes);
            }
        }

        return codes;
    }
}
