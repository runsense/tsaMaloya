// ===== p385 : les nouveaux mouvements Mixamo de Paris (coups reçus, KO, esquives, provocations, victoires, baisers, champs,
// porter, ivresse, capoeira, hache). Les duels varient les coups reçus ; la vie du camp gagne ses gestes. =====
Object.assign(MXBASE188,{touche:'Hit_To_Head',touche2:'Hit_To_Body',stun:'Big_Hit_To_Head',ko:'Knocked_Out',win:'Victory_Idle'});
Object.assign(MXSTY188.anglaise,{touche:'Light_Hit_To_Head',touche2:'Hit_To_Side_Of_Body',stun:'Medium_Hit_To_Head'});
Object.assign(MXSTY188.savate,{touche2:'Hit_To_Side_Of_Body'});
Object.assign(MXSTY188.capoeira,{idle:'Ginga_Variation_1',ko:'Sweep_Fall',ret:'Ginga_Sideways_To_Au'});
Object.assign(MXSTY188.escrime,{ko:'Dying',p3:'Axe_Downward'});
Object.assign(MXGESTE188,{baiser:'Kiss',bisou:'Blow_A_Kiss',ivre:'Drunk_Walk',rire_assis:'Sitting_Laughing',porter:'Carrying',porte_blesse:'Being_Carried',
 se_cacher:'Hiding',planter:'Dig_Plant',arroser:'Watering',arracher:'Pull_Plant',traire:'Cow_Milking',brouette:'Wheelbarrow_Walk',vider_brouette:'Wheelbarrow_Dump',
 esquive:'Dodging',esquive_arr:'Dodging_Back',baisser:'Ducking',provoc:'Standing_Taunt_Battlecry',poitrine:'Chest_Thump',victoire_pose:'Victory_Idle',
 agenouiller:'Kneeling_Down',ginga:'Ginga_Variation_1',au:'Ginga_Sideways_To_Au',hache:'Axe_Horizontal'});
// les gestes du camp prennent les mouvements les plus justes
try{Object.assign(G382,{bois:['hache',1600],casser:['hache',1600],malaxer:['agenouiller',2400]})}catch(e){}
