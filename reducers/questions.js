export default {
    /*'abnormal-attenuation-head-ct': {
        question: ['Is there any abnormal attenuation?', 'TEST'],
        subject: ['Abnormal attenuation on head CT', 'TEST'],
        description: ['Abnormal attenuation happens when guere guere guere and when there is some guere guere guere.', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'abnormal-attenuation-head-ct > yes'
            },
            {
                option: ['No', 'No'],
                next: 'abnormal-attenuation-head-ct > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [
            'https://www.oumedicine.com/images/ad-radiology/nml-mra_bright.jpg?sfvrsn=2',
            'http://radiologylouisville.com/wp-content/uploads/2011/02/mrib15rewindow_200w_ss.jpg',
            'http://www.houstonmethodist.org/-/media/images/health-professionals/department-of-radiology/radiology_banner_1140x400.ashx?h=400&la=en&w=1140&hash=CB29C3884B6DEBB5DC11604626806E531AB24194'
        ],
        previous: null
    },
    'abnormal-attenuation-head-ct > yes': {
        question: ['Is the abnormality dark or bright?', 'Es la anormalidad oscura o brillante?'],
        options: [
            {
                option: ['Dark', 'Oscura'],
                next: 'abnormal-attenuation-head-ct > yes > dark'
            },
            {
                option: ['Bright', 'Brillante'],
                next: 'abnormal-attenuation-head-ct > yes > bright'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [
            'https://www.oumedicine.com/images/ad-radiology/nml-mra_bright.jpg?sfvrsn=2',
        ],
        previous: 'abnormal-attenuation-head-ct'
    },
    'abnormal-attenuation-head-ct > yes > dark': {
        question: ['What is the dark abnormality causing?', ''],
        options: [
            {
                option: ['Mass Effect', ''],
                next: 'abnormal-attenuation-head-ct > yes > dark > mass-effect'
            },
            {
                option: ['Volume Loss', ''],
                next: 'abnormal-attenuation-head-ct > yes > dark > volume-loss'
            },
            {
                option: ['Nothing', ''],
                next: 'abnormal-attenuation-head-ct > yes > dark > nothing'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'abnormal-attenuation-head-ct > yes'
    },
    'abnormal-attenuation-head-ct > yes > dark > mass-effect': {
        question: ['What type of Mass Effect?', ''],
        options: [
            {
                option: ['Edema', ''],
                next: 'abnormal-attenuation-head-ct > yes > dark > mass-effect > edema'
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
        previous: 'abnormal-attenuation-head-ct > yes > dark'
    },
    'abnormal-attenuation-head-ct > yes > dark > mass-effect > edema': {
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
        previous: 'abnormal-attenuation-head-ct > yes > dark > mass-effect'
    },
    'abnormal-attenuation-head-ct > yes > dark > volume-loss': {
        question: ['Consider the following:', ''],
        options: [
            {
                option: ['Encephalomalacia', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'abnormal-attenuation-head-ct > yes > dark'
    },
    'abnormal-attenuation-head-ct > yes > dark > nothing': {
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
        previous: 'abnormal-attenuation-head-ct > yes > dark'
    },
    'abnormal-attenuation-head-ct > yes > bright': {
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
                next: 'abnormal-attenuation-head-ct > yes > bright > blood'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'abnormal-attenuation-head-ct > yes'
    },
    'abnormal-attenuation-head-ct > yes > bright > blood': {
        question: ['Where is the blood?', ''],
        options: [
            {
                option: ['Extraaxial', ''],
                next: 'abnormal-attenuation-head-ct > yes > bright > blood > extraaxial'
            },
            {
                option: ['Intraaxial.', ''],
                next: 'abnormal-attenuation-head-ct > yes > bright > blood > intraaxial'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'abnormal-attenuation-head-ct > yes > bright'
    },
    'abnormal-attenuation-head-ct > yes > bright > blood > extraaxial': {
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
        previous: 'abnormal-attenuation-head-ct > yes > bright > blood'
    },
    'abnormal-attenuation-head-ct > yes > bright > blood > intraaxial': {
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
        previous: 'abnormal-attenuation-head-ct > yes > bright > blood'
    },
    'abnormal-attenuation-head-ct > no': {
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
        previous: 'abnormal-attenuation-head-ct'
    },*/
    'pediatric-myelination': {
        question: ['Pediatric Myelination'],
        description: ['Begin with your T1 sequence. Myelination on T1 appears bright relative to grey matter.', 'TEST2'],
        subject: ['Pediatric myelination', 'TEST2'],
        options: [
            {
                option: ['Begin', 'Empezar'],
                next: 'pediatric-myelination > 01'
            }
        ],
        tags: [],
        images: [],
        previous: null
    },
    'pediatric-myelination > 01': {
        question: ['Are at least the medial aspects of the middle cerebellar peduncles myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination > 01 > 02'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > preterm'
            }
        ],
        tags: [],
        images: [
            'https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_cerebellar-peduncles.jpeg'
        ],
        previous: 'pediatric-myelination'
    },
    'pediatric-myelination > 01 > preterm': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Preterm infant', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01'
    },
    'pediatric-myelination > 01 > 02': {
        question: ['Is the dorsal brainstem myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination > 01 > 02 > 03'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > 02 > preterm'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_dorsal-brainstem.jpeg'],
        previous: 'pediatric-myelination > 01'
    },
    'pediatric-myelination > 01 > 02 > preterm': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Preterm infant', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02'
    },
    'pediatric-myelination > 01 > 02 > 03': {
        question: ['Is the posterior limb of the internal capsule myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > 02 > 03 > preterm'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_posterior-limb-internal-capsule.jpeg'],
        previous: 'pediatric-myelination > 01 > 02'
    },
    'pediatric-myelination > 01 > 02 > 03 > preterm': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Preterm infant', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02 > 03'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04': {
        question: ['Is the peri-Rolandic white matter myelinated?'],
        description: ['Axial T1 weighted image shows the central sulci of Rolando bilaterally (arrows) and the white matter adjacent to the central sulcus is termed the perirolandic white matter (dashed ovals).'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > preterm'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_perirolandic-white-matter.jpeg'],
        previous: 'pediatric-myelination > 01 > 02 > 03'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > preterm': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Preterm infant', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > 05': {
        question: ['Is the anterior limb of the internal capsule myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > term'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_anterior-limb-internal-capsule.jpeg'],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > term': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Term infant less than 2 months of age', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06': {
        question: ['Is the splenium of the corpus callosum myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 07'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 2-3 months'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_splenium-corpus-callosum.jpeg'],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 2-3 months': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 2-3 months of age', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 07': {
        question: ['Is the genu of the corpus callosum myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination-T2'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 07 > 3-4 months'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_genu-corpus-callosum.jpeg'],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06'
    },
    'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 07 > 3-4 months': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 3-4 months of age', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 07'
    },
    'pediatric-myelination-T2': {
        question: ['Switch to T2 sequence'],
        description: ['Remember, myelination appears dark relative to grey matter.'],
        options: [
            {
                option: ['Next', ''],
                next: 'pediatric-myelination-T2 > 01'
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination > 01 > 02 > 03 > 04 > 05 > 06 > 07'
    },
    'pediatric-myelination-T2 > 01': {
        question: ['Is the genu of the corpus callosum myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination-T2 > 01 > 02'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-T2 > 01 > 4-6 months'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_t2-genu-corpus-callosum.jpeg'],
        previous: 'pediatric-myelination-T2'
    },
    'pediatric-myelination-T2 > 01 > 4-6 months': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 4-6 months of age', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2 > 01'
    },
    'pediatric-myelination-T2 > 01 > 02': {
        question: ['Is the anterior limb of the internal capsule myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination-T2 > 01 > 02 > 03'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-T2 > 01 > 02 > 5-8 months'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_t2-anterior-limb-internal-capsule.jpeg'],
        previous: 'pediatric-myelination-T2 > 01'
    },
    'pediatric-myelination-T2 > 01 > 02 > 5-8 months': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 5-8 months of age', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2 > 01 > 02'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03': {
        question: ['Is the central frontal white matter myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-T2 > 01 > 02 > 03 > 7-11 months'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_central-frontal-white-matter.jpg'],
        previous: 'pediatric-myelination-T2 > 01 > 02'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03 > 7-11 months': {
        question: ['This myelination pattern suggests:'],
        options: [
            {
                option: ['Infant between 7-11 months of age', ''],
                next: null
            }
        ],
        tags: [],
        images: [],
        previous: 'pediatric-myelination-T2 > 01 > 02 > 03'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03 > 04': {
        question: ['Are the Subcortical U-fibers of the frontal lobes myelinated?'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05'
            },
            {
                option: ['No', 'No'],
                next: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 11-16 months'
            }
        ],
        tags: [],
        images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_subcortial-u-fibers-frontal-lobes.jpg'],
        previous: 'pediatric-myelination-T2 > 01 > 02 > 03'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 11-16 months': {
    question: ['This myelination pattern suggests:'],
    options: [
      {
        option: ['Child between 11-16 months of age', ''],
        next: null
      }
    ],
    tags: [],
    images: [],
    previous: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05': {
    question: ['Are the Subcortical U-Fibers of the temporal lobes myelinated?'],
    options: [
      {
        option: ['Yes', 'Si'],
        next: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05 > at-least-24'
      },
      {
        option: ['No', 'No'],
        next: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05 > 16-24 months'
      }
    ],
    tags: [],
    images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_subcortial-u-fibers-temporal-lobes.jpg'],
    previous: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05 > at-least-24': {
    question: ['This myelination pattern suggests:'],
    description: ['After 24 months of age, myelination is similar to an adult. Terminal zones of myelination may persist until the second decade of life, and appear as hyperintense areas in the periatrial white matter.'],
    options: [
      {
        option: ['Child at least 24 months of age.', ''],
        next: null
      }
    ],
    tags: [],
    images: ['https://s3-us-west-2.amazonaws.com/radiologic/pediatric-myelination/pediatric-myelination_24m-adult.jpg'],
    previous: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05'
    },
    'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05 > 16-24 months': {
    question: ['This myelination pattern suggests:'],
    options: [
      {
        option: ['Child between 16-24 months of age', ''],
        next: null
      }
    ],
    tags: [],
    images: [],
    previous: 'pediatric-myelination-T2 > 01 > 02 > 03 > 04 > 05'
    }
    /*,
    'cystic-sellar-mass': {
        question: ['Where is it located?', 'TEST'],
        subject: ['Cystic sellar mass: differentiating between cystic pituitary adenoma and rathe cleft cyst', 'TEST3'],
        description: ['This does not include masses that demonstrate invasion of the cavernous sinuses or masses that exhibit enhancements of a solid component.', 'TEST'],
        options: [
            {
                option: ['Midline', ''],
                next: 'cystic-sellar-mass > midline'
            },
            {
                option: ['Off-midline', 'No'],
                next: 'cystic-sellar-mass > off-midline'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: null
    },
    'cystic-sellar-mass > midline': {
        question: ['Is there fluid-fluid level?', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'cystic-sellar-mass > midline > yes'
            },
            {
                option: ['No', 'No'],
                next: 'cystic-sellar-mass > midline > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass'
    },
    'cystic-sellar-mass > midline > yes': {
        question: ['These findings suggest the following:', 'TEST'],
        options: [
            {
                option: ['Adenoma', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > midline'
    },
    'cystic-sellar-mass > midline > no': {
        question: ['Is there an intracystic module?', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'cystic-sellar-mass > midline > no > yes'
            },
            {
                option: ['No', 'No'],
                next: 'cystic-sellar-mass > midline > no > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > midline'
    },
    'cystic-sellar-mass > midline > no > yes': {
        question: ['These findings suggest the following:', 'TEST'],
        options: [
            {
                option: ['Rathe cleft cyst', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > midline > no'
    },
    'cystic-sellar-mass > midline > no > no': {
        question: ['Is there separation?', 'TEST'],
        options: [
            {
                option: ['Yes', ''],
                next: 'cystic-sellar-mass > midline > no > no > yes'
            },
            {
                option: ['No', ''],
                next: 'cystic-sellar-mass > midline > no > no > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > midline > no'
    },
    'cystic-sellar-mass > midline > no > no > no': {
        question: ['These findings suggest:', 'TEST'],
        options: [
            {
                option: ['Rathe cleft cyst', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > midline > no > no'
    },
    'cystic-sellar-mass > midline > no > no > yes': {
        question: ['These findings suggest:', 'TEST'],
        options: [
            {
                option: ['Adenoma', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > midline > no > no'
    },
    'cystic-sellar-mass > off-midline': {
        question: ['Is there fluid-fluid level or hypointense rim on T2?', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'cystic-sellar-mass > off-midline > yes'
            },
            {
                option: ['No', 'No'],
                next: 'cystic-sellar-mass > off-midline > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass'
    },
    'cystic-sellar-mass > off-midline > yes': {
        question: ['These findings suggest:', 'TEST'],
        options: [
            {
                option: ['Adenoma', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > off-midline'
    },
    'cystic-sellar-mass > off-midline > no': {
        question: ['Is there separation?:', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'cystic-sellar-mass > off-midline > no > yes'
            },
            {
                option: ['No', 'No'],
                next: 'cystic-sellar-mass > off-midline > no > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > off-midline'
    },
    'cystic-sellar-mass > off-midline > no > yes': {
        question: ['These findings suggest:', 'TEST'],
        options: [
            {
                option: ['Adenoma', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > off-midline > no'
    },
    'cystic-sellar-mass > off-midline > no > no': {
        question: ['Is there an intracystic module?', 'TEST'],
        options: [
            {
                option: ['Yes', 'Si'],
                next: 'cystic-sellar-mass > off-midline > no > no > yes'
            },
            {
                option: ['No', 'No'],
                next: 'cystic-sellar-mass > off-midline > no > no > no'
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > off-midline > no'
    },
    'cystic-sellar-mass > off-midline > no > no > yes': {
        question: ['These findings suggest:?', 'TEST'],
        options: [
            {
                option: ['Rathe cleft cyst', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > off-midline > no > no'
    },
    'cystic-sellar-mass > off-midline > no > no > no': {
        question: ['These findings suggest:', 'TEST'],
        options: [
            {
                option: ['Adenoma', ''],
                next: null
            }
        ],
        tags: ['abnormal', 'attenuation'],
        images: [],
        previous: 'cystic-sellar-mass > off-midline > no > no'
    }*/
};