export default {
    '01': {
        question: ['Is there any abnormal attenuation?', 'TEST'],
        subject: ['Abnormal attenuation on head CT', 'TEST'],
        description: ['Abnormal attenuation happens when guere guere guere and when there is some guere guere guere.', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: '02'
            },
            {
                option: ['No', 'No'],
                next: '12'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: ['https://www.oumedicine.com/images/ad-radiology/nml-mra_bright.jpg?sfvrsn=2', 'http://radiologylouisville.com/wp-content/uploads/2011/02/mrib15rewindow_200w_ss.jpg'],
        previous: null
    },
    '02': {
        question: ['Is the abnormality dark or bright?', 'Es la anormalidad oscura o brillante?'],
        options: [
            {
                option: ['Dark', 'Oscura'],
                next: '03'
            },
            {
                option: ['Bright', 'Brillante'],
                next: '08'
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
                next: '04'
            },
            {
                option: ['Volume Loss', ''],
                next: '06'
            },
            {
                option: ['Nothing', ''],
                next: '07'
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
                next: '05'
            },
            {
                option: ['Mass', ''],
                next: null
            },
            {
                option: ['Cyst'],
                next: null
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
                next: null
            },
            {
                option: ['Cytotoxic', ''],
                next: null
            },
            {
                option: ['Transependymal/Interstitial', ''],
                next: null
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
                next: null
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
                next: null
            },
            {
                option: ['Order MR for further characterization.', ''],
                next: null
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
                next: null
            },
            {
                option: ['It\'s Ca++/Minerals.', ''],
                next: null
            },
            {
                option: ['It\'s blood.', ''],
                next: '09'
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
                next: '10'
            },
            {
                option: ['Intraaxial.', ''],
                next: '11'
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
                next: null
            },
            {
                option: ['Subdural', ''],
                next: null
            },
            {
                option: ['Subarachnoid', ''],
                next: null
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
                next: null
            },
            {
                option: ['Intraventricular', ''],
                next: null
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
                next: null
            },
            {
                option: ['Big and funny looking', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: '09'
    },
    'pediatric-myelination': {
        question: ['Begin with your T1 sequence. Myelination on T1 appears bright relative to grey matter.', 'TEST2'],
        subject: ['Pediatric myelination', 'TEST2'],
        options: [
            {
                option: ['Next', 'Siguiente'],
                next: 'pediatric-myelination-01'
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
                next: 'pediatric-myelination-02'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-preterm'
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
                next: null
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
                next: 'pediatric-myelination-03'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-preterm'
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
                next: 'pediatric-myelination-04'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-preterm'
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
                next: 'pediatric-myelination-05'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-preterm'
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
                next: 'pediatric-myelination-06'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-term'
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
                next: null
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
                next: 'pediatric-myelination-07'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-2-3'
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
                next: null
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
                next: 'pediatric-myelination-T2'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-3-4'
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
                next: null
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
                next: 'pediatric-myelination-T2-01'
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
                next: 'pediatric-myelination-T2-02'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-4-6'
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
                next: null
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
                next: 'pediatric-myelination-T2-03'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-5-8'
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
                next: null
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
                next: 'pediatric-myelination-14-18'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-7-11'
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
                next: null
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
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2-03'
    }
};