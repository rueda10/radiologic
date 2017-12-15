export default {
    '01': {
        question: ['Is there any abnormal attenuation?', ''],
        subject: ['Abnormal attenuation on head CT'],
        definition: "",
        options: [
            {
                option: ['Yes', 'Si'],
                link: '02'
            },
            {
                option: ['No', 'No'],
                link: '12'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: ['https://www.oumedicine.com/images/ad-radiology/nml-mra_bright.jpg?sfvrsn=2', 'http://radiologylouisville.com/wp-content/uploads/2011/02/mrib15rewindow_200w_ss.jpg'],
        previous: null
    },
    '02': {
        question: ['Is the abnormality dark or bright?', ''],
        options: [
            {
                option: ['Dark', ''],
                link: '03'
            },
            {
                option: ['Bright', ''],
                link: '08'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '01'
    },
    '03': {
        question: ['What is the dark abnormality causing?', ''],
        options: [
            {
                option: ['Mass Effect', ''],
                link: '04'
            },
            {
                option: ['Volume Loss', ''],
                link: '06'
            },
            {
                option: ['Nothing', ''],
                link: '07'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '02'
    },
    '04': {
        question: ['What type of Mass Effect?', ''],
        options: [
            {
                option: ['Edema', ''],
                link: '05'
            },
            {
                option: ['Mass', ''],
                link: null
            },
            {
                option: ['Cyst'],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '03'
    },
    '05': {
        question: ['What type of Edema?', ''],
        options: [
            {
                option: ['Vasogenic', ''],
                link: null
            },
            {
                option: ['Cytotoxic', ''],
                link: null
            },
            {
                option: ['Transependymal/Interstitial', ''],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '04'
    },
    '06': {
        question: ['Consider the following:', ''],
        options: [
            {
                option: ['Encephalomalacia', ''],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '03'
    },
    '07': {
        question: ['Consider the following:', ''],
        options: [
            {
                option: ['It may be due to small size.', ''],
                link: null
            },
            {
                option: ['Order MR for further characterization.', ''],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '03'
    },
    '08': {
        question: ['Consider the following:', ''],
        options: [
            {
                option: ['It\'s metal.', ''],
                link: null
            },
            {
                option: ['It\'s Ca++/Minerals.', ''],
                link: null
            },
            {
                option: ['It\'s blood.', ''],
                link: '09'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '02'
    },
    '09': {
        question: ['Where is the blood?', ''],
        options: [
            {
                option: ['Extraaxial', ''],
                link: '10'
            },
            {
                option: ['Intraaxial.', ''],
                link: '11'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '08'
    },
    '10': {
        question: ['Consider the following:', ''],
        options: [
            {
                option: ['Epidural', ''],
                link: null
            },
            {
                option: ['Subdural', ''],
                link: null
            },
            {
                option: ['Subarachnoid', ''],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '09'
    },
    '11': {
        question: ['Consider the following:', ''],
        options: [
            {
                option: ['Parenchymal', ''],
                link: null
            },
            {
                option: ['Intraventricular', ''],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '09'
    },
    '12': {
        question: ['How are the size and configuration of the ventricles and cerebral sulci?', ''],
        options: [
            {
                option: ['Big and gross looking', ''],
                link: null
            },
            {
                option: ['Big and funny looking', ''],
                link: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '09'
    },
    'pediatric-myelination': {
        question: ['Begin with your T1 sequence. Myelination on T1 appears bright relative to grey matter.'],
        subject: ['Pediatric myelination'],
        options: [
            {
                option: ['Next'],
                link: 'pediatric-myelination-01'
            }
        ],
        tags: [],
        images: [],
        previous: null
    },
    'pediatric-myelination-01': {
        question: ['Is the middle cerebellar peduncle myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-02'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-preterm'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination'
    },
    'pediatric-myelination-preterm': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Preterm infant', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-01'
    },
    'pediatric-myelination-02': {
        question: ['Is the dorsal brainstem myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-03'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-preterm'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-01'
    },
    'pediatric-myelination-03': {
        question: ['Is the posterior limb of the internal capsule myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-04'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-preterm'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-02'
    },
    'pediatric-myelination-04': {
        question: ['Is the peri-Rolandic white matter myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-05'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-preterm'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-03'
    },
    'pediatric-myelination-05': {
        question: ['Is the anterior limb of the internal capsule myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-06'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-term'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-04'
    },
    'pediatric-myelination-term': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Term infant', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-05'
    },
    'pediatric-myelination-06': {
        question: ['Is the splenium of the corpus callosum myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-07'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-2-3'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-05'
    },
    'pediatric-myelination-2-3': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 2-3 months of age', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-06'
    },
    'pediatric-myelination-07': {
        question: ['Is the genu of the corpus callosum myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-T2'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-3-4'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-06'
    },
    'pediatric-myelination-3-4': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 3-4 months of age', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-07'
    },
    'pediatric-myelination-T2': {
        question: ['Now switch to T2 sequence. Remember, myelination appears dark relative to grey matter.'],
        options: [
            {
                option: ['Next', ''],
                link: 'pediatric-myelination-T2-01'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-07'
    },
    'pediatric-myelination-T2-01': {
        question: ['Is the genu of the corpus callosum myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-T2-02'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-4-6'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2'
    },
    'pediatric-myelination-4-6': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 4-6 months of age', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-01'
    },
    'pediatric-myelination-T2-02': {
        question: ['Is the anterior limb of the internal capsule myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-T2-03'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-5-8'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-01'
    },
    'pediatric-myelination-5-8': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 5-8 months of age', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-02'
    },
    'pediatric-myelination-T2-03': {
        question: ['Is the peripheral frontal white matter myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                link: 'pediatric-myelination-14-18'
            },
            {
                option: ['No', 'No'],
                link: 'pediatric-myelination-7-11'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-02'
    },
    'pediatric-myelination-7-11': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 7-11 months of age', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-03'
    },
    'pediatric-myelination-14-18': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant at least between 14-18 months of age', ''],
                link: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-03'
    }
};