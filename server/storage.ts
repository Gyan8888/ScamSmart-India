import { 
  users, User, InsertUser, 
  categories, Category, InsertCategory,
  scenarios, Scenario, InsertScenario,
  resources, Resource, InsertResource
} from "@shared/schema";

// Define storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserScore(id: number, score: number): Promise<User | undefined>;
  updateUserCompletedScenarios(id: number, scenarioIds: string[]): Promise<User | undefined>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Scenario operations
  getScenarios(): Promise<Scenario[]>;
  getScenario(id: number): Promise<Scenario | undefined>;
  getScenariosByCategory(categoryId: number): Promise<Scenario[]>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  
  // Resource operations
  getResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private scenarios: Map<number, Scenario>;
  private resources: Map<number, Resource>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private scenarioCurrentId: number;
  private resourceCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.scenarios = new Map();
    this.resources = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.scenarioCurrentId = 1;
    this.resourceCurrentId = 1;
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create Scenario 1: Lottery Scam
    this.createScenario({
      title: "Lottery Scam",
      description: "Be careful with messages about winning a lottery you never entered",
      categoryId: 1,
      contactName: "Subrat",
      contactStatus: "online",
      iconName: "ticket",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey, did you check your messages today? Something crazy happened!",
          timestamp: "11:03 AM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "No, what happened?",
          timestamp: "11:05 AM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "You won't believe it! There's this message saying I've won ₹5 lakh in a lucky draw from [Bank Name]! I think you should check too, they mentioned random users are selected.",
          timestamp: "11:07 AM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "Are you serious? That sounds too good to be true.",
          timestamp: "11:08 AM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "I thought so too, but they sent an official-looking link to claim the prize. I just need to verify my details. Maybe you should try as well. Here's the link: [Fake Lottery Link]",
          timestamp: "11:10 AM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "Let me check the link.",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "This seems fishy. I'm not clicking on random links.",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "I'll Google if this offer is real.",
          isCorrect: true
        },
        {
          id: "opt4",
          text: "I'll forward this to my friends and ask them to check.",
          isCorrect: false
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You clicked the fake link and downloaded an APK file.",
          isCorrect: false,
          explanation: [
            "Your phone might now be compromised",
            "The malware can access your personal information",
            "Scammers can steal your banking details",
            "Your contacts may also be targeted"
          ],
          advice: "Never click on suspicious links or download unknown files from messages claiming lottery wins."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "Good call! You avoided a potential scam and stayed safe.",
          isCorrect: true,
          explanation: [
            "Real lotteries don't inform winners through WhatsApp",
            "Banks don't distribute prizes through random lucky draws",
            "You can't win a lottery you never entered",
            "The urgency and excitement are tactics to override your caution"
          ],
          advice: "Always be skeptical of messages about unexpected winnings. Legitimate prizes don't require clicking unknown links."
        }
      ]
    });

    // Create Scenario 2: Investment Scam
    this.createScenario({
      title: "Investment Scam",
      description: "Beware of offers promising unrealistic returns on investments",
      categoryId: 1,
      contactName: "Ravi",
      contactStatus: "online",
      iconName: "trending-up",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Bro, I found something amazing! A new investment plan where you can double your money in just a month.",
          timestamp: "3:22 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "What? How does that even work?",
          timestamp: "3:24 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "Some big investors are in on this. You just need to deposit ₹10,000, and they guarantee a 200% return. My cousin already got his payout!",
          timestamp: "3:26 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "Sounds risky. Are you sure this is legit?",
          timestamp: "3:28 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "Of course! They even have a special offer if you join through my referral. Here's the link: [Fake Investment Link]",
          timestamp: "3:30 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "Let me invest quickly before I miss out!",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "Sounds too good to be true. I'll check for reviews first.",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "Do they have a registered company number or license?",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You transferred ₹10,000 to a fraudulent account.",
          isCorrect: false,
          explanation: [
            "The scammers disappear with your money",
            "No investment can guarantee doubling money in a month",
            "Your banking details may be compromised",
            "You might be targeted for more scams"
          ],
          advice: "Legitimate investments don't guarantee unrealistic returns. Always verify with financial experts and check regulatory registrations."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "You found warnings about this scam online, asked in financial forums and avoided the trap.",
          isCorrect: true,
          explanation: [
            "Doing research saved you from losing money",
            "Reviews showed others had been scammed",
            "No legitimate investment promises 200% returns in a month",
            "The pressure to act quickly is a red flag"
          ],
          advice: "Always research investment opportunities thoroughly and consult financial advisors before committing any money."
        }
      ]
    });

    // Create Scenario 3: Job Offer Scam
    this.createScenario({
      title: "Job Offer Scam",
      description: "Watch out for job offers that ask for upfront payments",
      categoryId: 1,
      contactName: "Ritu",
      contactStatus: "online",
      iconName: "briefcase",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey, I got an interview call for a remote job with an MNC! The pay is insane, ₹3.5 lakh per month!",
          timestamp: "5:13 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "That sounds amazing! How did you apply?",
          timestamp: "5:15 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "It's an easy process. They only need a small registration fee of ₹1,000 to process the application. After that, they send training materials and confirm your position.",
          timestamp: "5:17 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "A fee for a job? That sounds a little sketchy.",
          timestamp: "5:19 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "Not at all! My friend already got hired. You should apply too before slots run out. Here's the link: [Fake Job Application Link]",
          timestamp: "5:21 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "I'll pay the ₹1,000 and apply now!",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "Any real job shouldn't ask for money upfront.",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "Let me check if the company has posted this on their official website.",
          isCorrect: true
        },
        {
          id: "opt4",
          text: "I'll ask the HR contact for a formal offer letter.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You lose the money — there is no job. The scammers vanish after taking your payment.",
          isCorrect: false,
          explanation: [
            "Legitimate employers never charge candidates",
            "The salary offered is unrealistically high",
            "Your personal and banking details are compromised",
            "You might be targeted for more scams"
          ],
          advice: "Legitimate employers never ask for money in the hiring process. If someone asks for payment to get a job, it's almost certainly a scam."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "You avoid the trap and educate your friend too.",
          isCorrect: true,
          explanation: [
            "You recognized that legitimate employers don't charge applicants",
            "The job offer was unusually generous for minimal qualifications",
            "Urgent pressure to pay is a classic scam tactic",
            "By educating your friend, you helped them avoid losing money too"
          ],
          advice: "Always research companies thoroughly and remember that legitimate employers never charge applicants money to be hired."
        }
      ]
    });

    // Create Scenario 4: Bank Verification Scam
    this.createScenario({
      title: "Bank Verification Scam",
      description: "Be cautious about messages requiring urgent KYC verification",
      categoryId: 1,
      contactName: "Swapnil",
      contactStatus: "online",
      iconName: "credit-card",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey, did you receive a message from [Bank Name] about updating your KYC?",
          timestamp: "9:42 AM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "No, I didn't. What's it about?",
          timestamp: "9:44 AM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "They said my account will be frozen if I don't update my details today. It's some new RBI rule or something.",
          timestamp: "9:46 AM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "That sounds serious! What do we have to do?",
          timestamp: "9:48 AM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "Just fill out a simple form with your name, phone number, card details and Aadhaar/PAN details. I already did mine. Here's the link: [Fake Bank Verification Link]",
          timestamp: "9:50 AM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "This is urgent. I'll fill the form right now!",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "Banks never ask for KYC via random links. I'll call customer care.",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "Let me check RBI's website for any KYC update notice.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "Your sensitive data is stolen. You risk identity theft and bank fraud.",
          isCorrect: false,
          explanation: [
            "Scammers now have your bank details and identification information",
            "They can use this to access your accounts or take loans in your name",
            "Your card details may be used for unauthorized transactions",
            "Your Aadhaar and PAN can be misused for identity theft"
          ],
          advice: "Banks never request sensitive information via WhatsApp or email links. Always visit your bank's official website or branch for KYC updates."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "You confirm it's fake and stay protected.",
          isCorrect: true,
          explanation: [
            "Banks communicate through official channels, not WhatsApp forwards",
            "Customer care confirmed no such urgent requirement exists",
            "KYC updates are never done through shared links",
            "The urgency was created to make you act without thinking"
          ],
          advice: "Always verify any banking-related messages directly with your bank through their official contact numbers or by visiting a branch."
        }
      ]
    });

    // Create Scenario 5: Online Shopping Offer Scam
    this.createScenario({
      title: "Shopping Offer Scam",
      description: "Be cautious of deals that seem too good to be true",
      categoryId: 1,
      contactName: "Anindita",
      contactStatus: "online",
      iconName: "shopping-bag",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Bro, there's an insane deal going on! iPhones at 80% off for the first 500 customers!",
          timestamp: "2:33 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "What? That sounds unbelievable! Where's the offer?",
          timestamp: "2:35 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "It's a special deal from [Fake E-commerce Site]. You just need to register with your name, phone number, and card details to get early access.",
          timestamp: "2:37 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "Hmm… is it safe?",
          timestamp: "2:39 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "Of course! It's a limited-time offer, so don't miss it. Just sign up here: [Fake E-commerce Link]",
          timestamp: "2:41 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "80% off iPhones? I'm signing up now!",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "This looks too flashy and desperate to be real.",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "Let me verify this site's domain and reviews.",
          isCorrect: true
        },
        {
          id: "opt4",
          text: "I'll check if this deal is listed on Apple's official site.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You entered your card info and lost money in a fake purchase.",
          isCorrect: false,
          explanation: [
            "The site was fake and designed to steal your payment information",
            "Your card details may be used for unauthorized transactions",
            "No products will ever be delivered",
            "Your personal information may be sold to other scammers"
          ],
          advice: "If a deal seems too good to be true, it probably is. Always verify offers on official websites and be wary of unrealistic discounts."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "You recognize the red flags and avoid the scam.",
          isCorrect: true,
          explanation: [
            "80% discount on premium products like iPhones is unrealistic",
            "Legitimate retailers don't require card details just to view offers",
            "The urgency to register quickly is a pressure tactic",
            "Asking for payment information upfront is a major red flag"
          ],
          advice: "Shop only on verified websites and be extremely skeptical of deals that seem too good to be true, especially when shared through messages."
        }
      ]
    });

    // Create Scenario 6: Survey/Contest Scam
    this.createScenario({
      title: "Survey Scam",
      description: "Watch out for surveys asking for sensitive information",
      categoryId: 1,
      contactName: "Manju",
      contactStatus: "online",
      iconName: "file-text",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey, I found this survey where you can win free movie tickets just by answering a few questions!",
          timestamp: "6:11 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "Really? What kind of questions?",
          timestamp: "6:13 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "Just basic stuff—your name, email, phone number, and card details. I completed it in two minutes, and they already confirmed my entry!",
          timestamp: "6:15 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "Sounds easy. But do they ask for any payment?",
          timestamp: "6:17 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "Nope! Just sign up quickly before the offer expires. Here's the link: [Fake Survey Link]",
          timestamp: "6:19 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "Wow! I'll sign up quickly before it ends.",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "Why does a free survey need my card details?",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "I'll search for this contest online.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You submitted your personal and card details. They were stolen and used for fraudulent purchases.",
          isCorrect: false,
          explanation: [
            "No legitimate survey asks for card details",
            "Your financial information has been compromised",
            "The scammers can make unauthorized transactions",
            "Your personal data may be sold to other scammers"
          ],
          advice: "Legitimate surveys never ask for financial information. Be extremely suspicious of any free offer that requests your card details."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "Great job! You spotted the red flag. You dodged a classic scam and alert your friend.",
          isCorrect: true,
          explanation: [
            "You correctly identified that card details are never needed for surveys",
            "Free offers that ask for payment information are always scams",
            "The urgency created was designed to make you act hastily",
            "By alerting your friend, you helped protect them too"
          ],
          advice: "Never provide financial information for a supposedly free offer, and always question why sensitive data is being requested."
        }
      ]
    });

    // Create Scenario 7: School Event Registration (Legitimate)
    this.createScenario({
      title: "School Reunion",
      description: "Not all online forms are scams - learn to identify legitimate ones",
      categoryId: 1,
      contactName: "Senthil",
      contactStatus: "online",
      iconName: "users",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey, did you see the school reunion registration link? It's finally live!",
          timestamp: "7:22 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "No, I missed it. Where can I register?",
          timestamp: "7:24 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "Here's the link: [School Reunion Link] – they're collecting names and contact info for sending invites and goodies.",
          timestamp: "7:26 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "Nice! Is there any deadline?",
          timestamp: "7:28 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "Yep, they want responses by the end of this week. It only takes a minute.",
          timestamp: "7:30 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "Great! I'll fill it now.",
          isCorrect: true
        },
        {
          id: "opt2",
          text: "I'll check the website and ask our classmates too.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Safe Choice!",
          description: "You complete the form and get a confirmation for the event.",
          isCorrect: true,
          explanation: [
            "This was a legitimate registration form",
            "It didn't ask for sensitive financial information",
            "You were able to verify it with other classmates",
            "The link led to a known organization's website"
          ],
          advice: "While it's good to be cautious, legitimate forms exist too. This form followed good practices by not asking for sensitive financial information and having a clear purpose."
        }
      ]
    });

    // Create Scenario 8: University Webinar Invite (Legitimate)
    this.createScenario({
      title: "University Webinar",
      description: "Understanding what makes an online invitation legitimate",
      categoryId: 1,
      contactName: "Divya",
      contactStatus: "online",
      iconName: "video",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey, our university is hosting a free mental health webinar next week.",
          timestamp: "3:52 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "Oh, I'd love to join that!",
          timestamp: "3:54 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "Here's the official link: [University Webinar Link] – no registration fee, just basic details like name and email.",
          timestamp: "3:56 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "That's cool. Who's conducting it?",
          timestamp: "3:58 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "One of the top psychologists in India, and there's a Q&A too!",
          timestamp: "4:00 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "I'm signing up now.",
          isCorrect: true
        },
        {
          id: "opt2",
          text: "I'll share this with a friend who needs it.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Safe Choice!",
          description: "You get registered and receive the Zoom link instantly.",
          isCorrect: true,
          explanation: [
            "This was a legitimate event registration",
            "It only asked for basic information, not financial details",
            "The webinar was hosted by a trusted institution",
            "There was no payment involved"
          ],
          advice: "Legitimate event registrations typically ask only for necessary information like name and email, not financial or highly sensitive details."
        }
      ]
    });

    // Create Scenario 9: OTP Scam
    this.createScenario({
      title: "OTP Scam",
      description: "Never share your one-time passwords with anyone",
      categoryId: 1,
      contactName: "Unknown Number",
      contactStatus: "online",
      iconName: "key",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Hey! I accidentally sent an OTP to your number instead of mine. Can you please send it back?",
          timestamp: "8:31 AM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "OTP? I just got one now.",
          timestamp: "8:33 AM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "Yes! That's the one. Please check the screen notification. Please forward it quickly.",
          timestamp: "8:35 AM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "Sorry, I don't know u.. why should I send it??",
          timestamp: "8:37 AM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "I made a mistake — just send it over.",
          timestamp: "8:39 AM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "Okay, here's the OTP.",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "Wait… OTPs are private. I'm not sharing it.",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "I'll call the official support to confirm.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You just gave access to your account. The scammer logs in and locks you out.",
          isCorrect: false,
          explanation: [
            "The scammer is trying to access one of your accounts",
            "The OTP was likely triggered by the scammer attempting to log in",
            "By sharing it, you've given them access to your account",
            "They may now have control of your personal data or finances"
          ],
          advice: "Never share OTPs with anyone, not even friends or family. Companies will never ask for your OTP through any channel."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "You stay safe and protect your account from unauthorized access.",
          isCorrect: true,
          explanation: [
            "OTPs are security measures specifically designed to be private",
            "The story about 'sending it to the wrong number' is a common scam",
            "The urgency in their request is a manipulation tactic",
            "By refusing, you protected your account from being compromised"
          ],
          advice: "OTPs should never be shared with anyone under any circumstances. They are designed specifically as a personal verification method."
        }
      ]
    });

    // Create Scenario 10: Tech Support Scam
    this.createScenario({
      title: "Tech Support Scam",
      description: "Be wary of unsolicited technical support messages",
      categoryId: 1,
      contactName: "Ishaan",
      contactStatus: "online",
      iconName: "monitor",
      messages: [
        {
          id: "msg1",
          sender: "contact",
          content: "Bro, my screen froze and I got a pop-up from Microsoft support. They gave me a link to fix it.",
          timestamp: "4:12 PM"
        },
        {
          id: "msg2",
          sender: "user",
          content: "Really? What did it say?",
          timestamp: "4:14 PM"
        },
        {
          id: "msg3",
          sender: "contact",
          content: "It said there's malware on my device. I called the number, and they asked to download this software: [Fake Tech Support Link]",
          timestamp: "4:16 PM"
        },
        {
          id: "msg4",
          sender: "user",
          content: "That sounds shady.",
          timestamp: "4:18 PM"
        },
        {
          id: "msg5",
          sender: "contact",
          content: "I already installed it. They asked for remote access to check the issue.",
          timestamp: "4:20 PM"
        }
      ],
      options: [
        {
          id: "opt1",
          text: "Let me install it too. My laptop's been slow anyway.",
          isCorrect: false
        },
        {
          id: "opt2",
          text: "I've heard of such scams. Don't let them control your computer!",
          isCorrect: true
        },
        {
          id: "opt3",
          text: "I'll check Microsoft's official site first.",
          isCorrect: true
        }
      ],
      outcomes: [
        {
          id: "out1",
          title: "Unsafe Choice!",
          description: "You grant access to your device. The scammer installs malware and steals personal files.",
          isCorrect: false,
          explanation: [
            "The pop-up was fake and designed to scare you",
            "The software is actually a remote access tool for scammers",
            "They can access all your files, passwords, and personal information",
            "Your computer may be infected with additional malware"
          ],
          advice: "Legitimate tech companies never use pop-ups with phone numbers to offer support. Always contact support through official websites or customer service."
        },
        {
          id: "out2",
          title: "Safe Choice!",
          description: "You stop your friend and recommend an antivirus scan instead.",
          isCorrect: true,
          explanation: [
            "Tech support scams use fear to trick people into giving access",
            "Microsoft and other companies never monitor your PC or show such alerts",
            "The pop-up was fake and designed to create panic",
            "By warning your friend, you may have protected their data"
          ],
          advice: "If you encounter tech issues, use official support channels or trusted antivirus software, not random pop-ups or unsolicited messages."
        }
      ]
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { 
      ...insertUser, 
      id,
      completedScenarios: [],
      score: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserScore(id: number, score: number): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    user.score = score;
    this.users.set(id, user);
    return user;
  }

  async updateUserCompletedScenarios(id: number, scenarioIds: string[]): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    user.completedScenarios = scenarioIds;
    this.users.set(id, user);
    return user;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Scenario operations
  async getScenarios(): Promise<Scenario[]> {
    return Array.from(this.scenarios.values());
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async getScenariosByCategory(categoryId: number): Promise<Scenario[]> {
    return Array.from(this.scenarios.values()).filter(
      (scenario) => scenario.categoryId === categoryId
    );
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = this.scenarioCurrentId++;
    const scenario: Scenario = { ...insertScenario, id };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  // Resource operations
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.resourceCurrentId++;
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }
}

export const storage = new MemStorage();
