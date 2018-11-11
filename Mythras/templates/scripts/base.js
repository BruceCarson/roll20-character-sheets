    // ##### Functions #####
    // Characteristic Functions
    var calc_str = function() {
        getAttrs(["str_base", "str_training", "str_ageing", "str_other", "str_temp"], function(v) {
            setAttrs({str: parseInt(v.str_base) + parseInt(v.str_training) + parseInt(v.str_ageing) + parseInt(v.str_other) + parseInt(v.str_temp)});
        });
    };
    
    var calc_con = function() {
        getAttrs(["con_base", "con_training", "con_ageing", "con_other", "con_temp"], function(v) {
            setAttrs({con: parseInt(v.con_base) + parseInt(v.con_training) + parseInt(v.con_ageing) + parseInt(v.con_other) + parseInt(v.con_temp)});
        });
    };
    
    var calc_siz = function() {
        getAttrs(["siz_base", "siz_other", "siz_temp"], function(v) {
            setAttrs({siz: parseInt(v.siz_base) + parseInt(v.siz_other) + parseInt(v.siz_temp)});
        });
    };
    
    var calc_dex = function() {
        getAttrs(["dex_base", "dex_training", "dex_ageing", "dex_other", "dex_temp"], function(v) {
            setAttrs({dex: parseInt(v.dex_base) + parseInt(v.dex_training) + parseInt(v.dex_ageing) + parseInt(v.dex_other) + parseInt(v.dex_temp)});
        });
    };
    
    var calc_int = function() {
        getAttrs(["int_base", "int_training", "int_ageing", "int_other", "int_temp"], function(v) {
            setAttrs({int: parseInt(v.int_base) + parseInt(v.int_training) + parseInt(v.int_ageing) + parseInt(v.int_other) + parseInt(v.int_temp)});
        });
    };
    
    var calc_pow = function() {
        getAttrs(["pow_base", "pow_training", "pow_ageing", "pow_other", "pow_temp"], function(v) {
            setAttrs({pow: parseInt(v.pow_base) + parseInt(v.pow_training) + parseInt(v.pow_ageing) + parseInt(v.pow_other) + parseInt(v.pow_temp)});
        });
    };
    
    var calc_cha = function() {
        getAttrs(["cha_base", "cha_training", "cha_ageing", "cha_other", "cha_temp"], function(v) {
            setAttrs({cha: parseInt(v.cha_base) + parseInt(v.cha_training) + parseInt(v.cha_ageing) + parseInt(v.cha_other) + parseInt(v.cha_temp)});
        });
    };
    
    // Attribute Functions
    var calc_action_points = function() {
        getAttrs(["dex", "int", "pow", "action_points_temp", "action_points_other", "action_points_add_one", "fatigue", "spirit", "action_points_calc"], function(v) {
            if (v["action_points_calc"] == "set_2") {
                var base_value = 2;
            } else if (v["action_points_calc"] == "set_3") {
                var base_value = 3;
            } else {
                if(v["spirit"] == "1") {
                    var base_value = Math.ceil((parseInt(v.int) + parseInt(v.pow)) / 12);
                } else {
                    var base_value = Math.ceil((parseInt(v.int) + parseInt(v.dex)) / 12);
                }
            } 
            
            var fatigue = parseInt(v.fatigue);
            if (fatigue > 5) {
                var action_points_fatigue = getTranslationByKey("no-penalty-u");
                var action_points = base_value + parseInt(v.action_points_add_one) + parseInt(v.action_points_temp) + parseInt(v.action_points_other);
            } else if (fatigue == 5) {
                var action_points_fatigue = "-1";
                var action_points = base_value + parseInt(v.action_points_add_one) + parseInt(v.action_points_temp) + parseInt(v.action_points_other) - 1;
            } else if (fatigue == 4) {
                var action_points_fatigue = "-2";
                var action_points = base_value + parseInt(v.action_points_add_one) + parseInt(v.action_points_temp) + parseInt(v.action_points_other) - 2;
            } else if (fatigue == 3) {
                var action_points_fatigue = "-3";
                var action_points = base_value + parseInt(v.action_points_add_one) + parseInt(v.action_points_temp) + parseInt(v.action_points_other) - 3;
            } else {
                var action_points_fatigue = getTranslationByKey("no-activities-possible-u");
                var action_points = 0;
            }
            
            if (action_points < 0) {
                action_points = 0;
            }
            setAttrs({
                action_points_max: action_points,
                action_points_fatigue: action_points_fatigue,
                action_points_base: base_value
            });
        });
    };
    
    var calc_spirit_damage = function() {
		getAttrs(["willpower_experience", "willpower_other", "willpower_augment", "binding_learned", "binding_base", "binding_experience", "binding_other", "binding_augment", "pow", "cha"], function(values) {
		    var pow = parseInt(values.pow);
		    var cha = parseInt(values.cha);
		    var binding = (parseInt(values.binding_learned) * (pow + cha)) + parseInt(values.binding_experience) + parseInt(values.binding_other) + parseInt(values.binding_augment);
		    var willpower = pow + pow + parseInt(values.willpower_experience) + parseInt(values.willpower_other) + parseInt(values.willpower_augment);
		    if ((willpower/2) > binding) {
		        var spirit_damage_table_value = Math.ceil((willpower/2)/20);
		    } else {
		        var spirit_damage_table_value = Math.ceil(binding/20);
		    }
			
			var spirit_damage_result = '0';
			if (spirit_damage_table_value == 1) {
			     spirit_damage_result = '1d2';
		    } else if (spirit_damage_table_value == 2) {
			    spirit_damage_result = '1d4';
		    } else if (spirit_damage_table_value == 3) {
			    spirit_damage_result = '1d6';
		    } else if (spirit_damage_table_value == 4) {
			    spirit_damage_result = '1d8';
		    } else if (spirit_damage_table_value == 5) {
			    spirit_damage_result = '1d10';
		    } else if (spirit_damage_table_value == 6) {
			    spirit_damage_result = '2d6';
		    } else if (spirit_damage_table_value == 7) {
			    spirit_damage_result = '1d8+1d6';
		    } else if (spirit_damage_table_value == 8) {
			    spirit_damage_result = '2d8';
		    } else if (spirit_damage_table_value == 9) {
			    spirit_damage_result = '1d10+1d8';
		    } else if (spirit_damage_table_value == 10) {
			    spirit_damage_result = '2d10';
		    } else if (spirit_damage_table_value == 11) {
			    spirit_damage_result = '2d10+1d2';
		    } else if (spirit_damage_table_value == 12) {
			    spirit_damage_result = '2d10+1d4';
		    } else if (spirit_damage_table_value == 13) {
			    spirit_damage_result = '2d10+1d6';
		    } else if (spirit_damage_table_value == 14) {
			    spirit_damage_result = '2d10+1d8';
		    } else if (spirit_damage_table_value == 15) {
			    spirit_damage_result = '3d10';
		    } else {
		        spirit_damage_result = '0';
		    }
			
			setAttrs({
				spirit_damage: spirit_damage_result,
			});
		});
    };
    
    var calc_damage_mod = function() {
		getAttrs(["str", "siz", "pow", "damage_mod_add_pow", "damage_mod_other", "damage_mod_temp"], function(values) {
			if (values.damage_mod_add_pow == 1) {
				var damage_mod_table_value = parseInt(values.str) + parseInt(values.siz) + parseInt(values.pow);
			} else {
				var damage_mod_table_value = parseInt(values.str) + parseInt(values.siz);
			}
			
			var base_damage_mod_step = find_damage_mod_step(damage_mod_table_value);
			var base_damage_mod_value = find_damage_mod(base_damage_mod_step);
			
			var damage_mod_step = parseInt(base_damage_mod_step) + parseInt(values.damage_mod_other) + parseInt(values.damage_mod_temp);
			var damage_mod_value = find_damage_mod(damage_mod_step);
			
			setAttrs({
				damage_mod_base: base_damage_mod_value,
				damage_mod: damage_mod_value
			});
		});
    };
    
    var calc_experience_mod = function() {
        getAttrs(["cha", "experience_mod_other", "experience_mod_temp"], function(v) {
            var base_value = Math.ceil(parseInt(v.cha)/6)-2;
            
            setAttrs({
				experience_mod_base: base_value,
				experience_mod: base_value + parseInt(v.experience_mod_other) + parseInt(v.experience_mod_temp)
			});
        });
    };

    var calc_healing_rate = function() { 
        getAttrs(["con", "healing_rate_other", "healing_rate_temp", "healing_rate_double"], function(v) {
            if (v.healing_rate_double == "1") {
                var base_value = Math.ceil(parseInt(v.con)/6)*2;
            } else {
                var base_value = Math.ceil(parseInt(v.con)/6);
            }
            
            setAttrs({
				healing_rate_base: base_value,
				healing_rate: base_value + parseInt(v.healing_rate_other) + parseInt(v.healing_rate_temp)
            });
        });
    };
    
    var calc_initiative = function() {
        getAttrs(["dex", "int", "cha", "initiative_bonus_temp", "armor_penalty", "fatigue", "initiative_bonus_other", "spirit"], function(v) {
            if(v["spirit"] == "1") {
                var base_value = Math.ceil((parseInt(v.int) + parseInt(v.cha)) / 2);
            } else {
                var base_value = Math.ceil((parseInt(v.int) + parseInt(v.dex)) / 2);
            }
            
            var fatigue = parseInt(v.fatigue);
            if (fatigue > 6) {
                var initiative_bonus_fatigue = getTranslationByKey("no-penalty-u");
                var initiative_bonus = base_value + parseInt(v.initiative_bonus_other) + parseInt(v.initiative_bonus_temp) + parseInt(v.armor_penalty);
            } else if (fatigue == 6) {
                var initiative_bonus_fatigue = "-2";
                var initiative_bonus = base_value + parseInt(v.initiative_bonus_other) + parseInt(v.initiative_bonus_temp) + parseInt(v.armor_penalty) - 2;
            } else if (fatigue == 5) {
                var initiative_bonus_fatigue = "-4";
                var initiative_bonus = base_value + parseInt(v.initiative_bonus_other) + parseInt(v.initiative_bonus_temp) + parseInt(v.armor_penalty) - 4;
            } else if (fatigue == 4) {
                var initiative_bonus_fatigue = "-6";
                var initiative_bonus = base_value + parseInt(v.initiative_bonus_other) + parseInt(v.initiative_bonus_temp) + parseInt(v.armor_penalty) - 6;
            } else if (fatigue == 3) {
                var initiative_bonus_fatigue = "-8";
                var initiative_bonus = base_value + parseInt(v.initiative_bonus_other) + parseInt(v.initiative_bonus_temp) + parseInt(v.armor_penalty) - 8;
            } else {
                var initiative_bonus_fatigue = getTranslationByKey("no-activities-possible-u");
                var initiative_bonus = base_value + parseInt(v.initiative_bonus_other) + parseInt(v.initiative_bonus_temp) + parseInt(v.armor_penalty) - 99;
            }
            
            setAttrs({
                initiative_bonus_base: base_value,
                initiative_bonus_fatigue: initiative_bonus_fatigue,
                initiative_bonus: initiative_bonus
            });
        });
    };
    
    var calc_spirit_intensity = function() {
        getAttrs(["pow"], function(v) {
            setAttrs({ spirit_intensity: Math.ceil(parseInt(v.pow)/6) });
        });
    };
    
    var calc_luck_points = function() {
        getAttrs(["pow", "luck_points_temp", "luck_points_other", "luck_points_rank", "rank"], function(v) {
            if (v.luck_points_rank == "1") {
                var base_value = Math.ceil(parseInt(v.pow)/6) + parseInt(v.rank);
            } else {
                var base_value = Math.ceil(parseInt(v.pow)/6);
            }
            setAttrs({
                luck_points_base: base_value,
                luck_points_max: base_value + parseInt(v.luck_points_temp) + parseInt(v.luck_points_other)
            });
        });
    };
    
    var calc_magic_points = function() {
        getAttrs(["pow", "magic_points_temp", "magic_points_other", "prana_points_temp", "prana_points_other", "power_points_temp", "power_points_other"], function(v) {
            setAttrs({
                magic_points_base: parseInt(v.pow),
                magic_points_max: parseInt(v.pow) + parseInt(v.magic_points_temp) + parseInt(v.magic_points_other),
                prana_points_base: parseInt(v.pow),
                prana_points_max: parseInt(v.pow) + parseInt(v.prana_points_temp) + parseInt(v.prana_points_other),
                power_points_base: parseInt(v.pow),
                power_points_max: parseInt(v.pow) + parseInt(v.power_points_temp) + parseInt(v.power_points_other)
            });
        });
    };
    
    var calc_tenacity = function() {
        var total_dependency_score = 0;
        var tenacity_dependencies = 0;
        getSectionIDs("repeating_dependency", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_dependency_" + currentID + "_score"], function(v) {
                        if(v["repeating_dependency_" + currentID + "_score"] && isNaN(parseInt(v["repeating_dependency_" + currentID + "_score"], 10)) === false) {
                            total_dependency_score = total_dependency_score + parseInt(v["repeating_dependency_" + currentID + "_score"], 10);
                        }
                        if(i === idarray.length - 1) {
                            tenacity_dependencies = 0-Math.floor(total_dependency_score/20);
                        }
                    });
                });
            }
            
            getAttrs(["pow", "tenacity_temp", "tenacity_other", "apply_dependencies_penalty"], function(val) {
                setAttrs({
                    tenacity_dependencies: tenacity_dependencies,
                    tenacity_base: parseInt(val.pow),
                    tenacity_max: parseInt(val.pow) + parseInt(val.tenacity_temp) + parseInt(val.tenacity_other) + (tenacity_dependencies*parseInt(val.apply_dependencies_penalty))
                });
            });
        });
    };

    var calc_hp_max_base = function() {
        getAttrs(["con", "siz", "pow", "hp_use_pow"], function(v) {
            base_value = Math.ceil( (parseInt(v.con) + parseInt(v.siz) + (parseInt(v.pow) * parseInt(v.hp_use_pow)))/5 );

            setAttrs({
                hp_max_base: base_value,
            });
        });
    };

    
    function upgrade_1_0_to_1_1() {
        console.log("converting strike_rank to initiative_bonus");
        var newattrs = {};
        getAttrs(["strike_rank_temp", "strike_rank_details", "strike_rank_armor", "strike_rank_fatigue", "strike_rank_other"], function(v) {
            if(v["strike_rank_temp"]) {
                newattrs["initiative_bonus_temp"] = v.strike_rank_temp;
            }
            if(v["strike_rank_details"]) {
                newattrs["initiative_bonus_details"] = v.strike_rank_details;
            }
            if(v["strike_rank_armor"]) {
                newattrs["initiative_bonus_armor"] = v.strike_rank_armor;
            }
            if(v["strike_rank_fatigue"]) {
                newattrs["initiative_bonus_fatigue"] = v.strike_rank_fatigue;
            }
            if(v["strike_rank_other"]) {
                newattrs["initiative_bonus_other"] = v.strike_rank_other;
            }
            console.log("Setting init bonus values copied from strike rank");
            setAttrs(newattrs);
        });
    }
    
    function upgrade_1_1_to_1_2_0() {
        console.log("fixing misspelled missile attrs");
        var newattrs = {};
        getAttrs(["missle_weapons_enc"], function(v) {
            if(v["missle_weapons_enc"]) {
                newattrs["missile_weapons_enc"] = v.missle_weapons_enc;
            }
            console.log("Setting missile_weapons_enc value copied from missle_weapons_enc");
            setAttrs(newattrs);
        });
    }
    
    function upgrade_1_2_0_to_1_3_0() {
        console.log("convert to configable hit locations");
        var location1_newattrs = {};
        getAttrs(["right_leg_armor_ap", "right_leg_armor_equipped", "right_leg_other_ap", "right_leg_hp", "right_leg_hp_max_base", "right_leg_hp_max_other", "right_leg_details", "right_leg_armor_type", "right_leg_armor_enc", "location1_armor_ap", "location1_armor_equipped", "location1_other_ap", "location1_hp", "location1_hp_max_base", "location1_hp_max_other", "location1_details", "location1_armor_type", "location1_armor_enc"], function(v) {
            if((v["right_leg_armor_ap"]) && ((v["location1_armor_ap"] === undefined) || (v["location1_armor_ap"] === ""))) {
                location1_newattrs["location1_armor_ap"] = v.right_leg_armor_ap;
            }
            if((v["right_leg_armor_equipped"]) && ((v["location1_armor_equipped"] === undefined) || (v["location1_armor_equipped"] === ""))) {
                location1_newattrs["location1_armor_equipped"] = v.right_leg_armor_equipped;
            }
            if((v["right_leg_other_ap"]) && ((v["location1_other_ap"] === undefined) || (v["location1_other_ap"] === ""))) {
                location1_newattrs["location1_other_ap"] = v.right_leg_other_ap;
            }
            if((v["right_leg_hp"]) && ((v["location1_hp"] === undefined) || (v["location1_hp"] === ""))) {
                location1_newattrs["location1_hp"] = v.right_leg_hp;
            }
            if((v["right_leg_hp_max_base"]) && ((v["location1_hp_max_base"] === undefined) || (v["location1_hp_max_base"] === ""))) {
                location1_newattrs["location1_hp_max_base"] = v.right_leg_hp_max_base;
            }
            if((v["right_leg_hp_max_other"]) && ((v["location1_hp_max_other"] === undefined) || (v["location1_hp_max_other"] === ""))) {
                location1_newattrs["location1_hp_max_other"] = v.right_leg_hp_max_other;
            }
            if((v["right_leg_details"]) && ((v["location1_details"] === undefined) || (v["location1_details"] === ""))) {
                location1_newattrs["location1_details"] = v.right_leg_details;
            }
            if((v["right_leg_armor_type"]) && ((v["location1_armor_type"] === undefined) || (v["location1_armor_type"] === ""))) {
                location1_newattrs["location1_armor_type"] = v.right_leg_armor_type;
            }
            if((v["right_leg_armor_enc"]) && ((v["location1_armor_enc"] === undefined) || (v["location1_armor_enc"] === ""))) {
                location1_newattrs["location1_armor_enc"] = v.right_leg_armor_enc;
            }
            console.log("Setting hit location1 values copied from right_leg");
            setAttrs(location1_newattrs);
        });
        
        var location2_newattrs = {};
        getAttrs(["left_leg_armor_ap", "left_leg_armor_equipped", "left_leg_other_ap", "left_leg_hp", "left_leg_hp_max_base", "left_leg_hp_max_other", "left_leg_details", "left_leg_armor_type", "left_leg_armor_enc", "location2_armor_ap", "location2_armor_equipped", "location2_other_ap", "location2_hp", "location2_hp_max_base", "location2_hp_max_other", "location2_details", "location2_armor_type", "location2_armor_enc"], function(v) {
            if((v["left_leg_armor_ap"]) && ((v["location2_armor_ap"] === undefined) || (v["location2_armor_ap"] === ""))) {
                location2_newattrs["location2_armor_ap"] = v.left_leg_armor_ap;
            }
            if((v["left_leg_armor_equipped"]) && ((v["location2_armor_equipped"] === undefined) || (v["location2_armor_equipped"] === ""))) {
                location2_newattrs["location2_armor_equipped"] = v.left_leg_armor_equipped;
            }
            if((v["left_leg_other_ap"]) && ((v["location2_other_ap"] === undefined) || (v["location2_other_ap"] === ""))) {
                location2_newattrs["location2_other_ap"] = v.left_leg_other_ap;
            }
            if((v["left_leg_hp"]) && ((v["location2_hp"] === undefined) || (v["location2_hp"] === ""))) {
                location2_newattrs["location2_hp"] = v.left_leg_hp;
            }
            if((v["left_leg_hp_max_base"]) && ((v["location2_hp_max_base"] === undefined) || (v["location2_hp_max_base"] === ""))) {
                location2_newattrs["location2_hp_max_base"] = v.left_leg_hp_max_base;
            }
            if((v["left_leg_hp_max_other"]) && ((v["location2_hp_max_other"] === undefined) || (v["location2_hp_max_other"] === ""))) {
                location2_newattrs["location2_hp_max_other"] = v.left_leg_hp_max_other;
            }
            if((v["left_leg_details"]) && ((v["location2_details"] === undefined) || (v["location2_details"] === ""))) {
                location2_newattrs["location2_details"] = v.left_leg_details;
            }
            if((v["left_leg_armor_type"]) && ((v["location2_armor_type"] === undefined) || (v["location2_armor_type"] === ""))) {
                location2_newattrs["location2_armor_type"] = v.left_leg_armor_type;
            }
            if((v["left_leg_armor_enc"]) && ((v["location2_armor_enc"] === undefined) || (v["location2_armor_enc"] === ""))) {
                location2_newattrs["location2_armor_enc"] = v.left_leg_armor_enc;
            }
            console.log("Setting hit location2 values copied from left_leg");
            setAttrs(location2_newattrs);
        });
        
        var location3_newattrs = {};
        getAttrs(["abdomen_armor_ap", "abdomen_armor_equipped", "abdomen_other_ap", "abdomen_hp", "abdomen_hp_max_base", "abdomen_hp_max_other", "abdomen_details", "abdomen_armor_type", "abdomen_armor_enc", "location3_armor_ap", "location3_armor_equipped", "location3_other_ap", "location3_hp", "location3_hp_max_base", "location3_hp_max_other", "location3_details", "location3_armor_type", "location3_armor_enc"], function(v) {
            if((v["abdomen_armor_ap"]) && ((v["location3_armor_ap"] === undefined) || (v["location3_armor_ap"] === ""))) {
                location3_newattrs["location3_armor_ap"] = v.abdomen_armor_ap;
            }
            if((v["abdomen_armor_equipped"]) && ((v["location3_armor_equipped"] === undefined) || (v["location3_armor_equipped"] === ""))) {
                location3_newattrs["location3_armor_equipped"] = v.abdomen_armor_equipped;
            }
            if((v["abdomen_other_ap"]) && ((v["location3_other_ap"] === undefined) || (v["location3_other_ap"] === ""))) {
                location3_newattrs["location3_other_ap"] = v.abdomen_other_ap;
            }
            if((v["abdomen_hp"]) && ((v["location3_hp"] === undefined) || (v["location3_hp"] === ""))) {
                location3_newattrs["location3_hp"] = v.abdomen_hp;
            }
            if((v["abdomen_hp_max_base"]) && ((v["location3_hp_max_base"] === undefined) || (v["location3_hp_max_base"] === ""))) {
                location3_newattrs["location3_hp_max_base"] = v.abdomen_hp_max_base;
            }
            if((v["abdomen_hp_max_other"]) && ((v["location3_hp_max_other"] === undefined) || (v["location3_hp_max_other"] === ""))) {
                location3_newattrs["location3_hp_max_other"] = v.abdomen_hp_max_other;
            }
            if((v["abdomen_details"]) && ((v["location3_details"] === undefined) || (v["location3_details"] === ""))) {
                location3_newattrs["location3_details"] = v.abdomen_details;
            }
            if((v["abdomen_armor_type"]) && ((v["location3_armor_type"] === undefined) || (v["location3_armor_type"] === ""))) {
                location3_newattrs["location3_armor_type"] = v.abdomen_armor_type;
            }
            if((v["abdomen_armor_enc"]) && ((v["location3_armor_enc"] === undefined) || (v["location3_armor_enc"] === ""))) {
                location3_newattrs["location3_armor_enc"] = v.abdomen_armor_enc;
            }
            console.log("Setting hit location3 values copied from abdomen");
            setAttrs(location3_newattrs);
        });
        
        var location4_newattrs = {};
        getAttrs(["chest_armor_ap", "chest_armor_equipped", "chest_other_ap", "chest_hp", "chest_hp_max_base", "chest_hp_max_other", "chest_details", "chest_armor_type", "chest_armor_enc", "location4_armor_ap", "location4_armor_equipped", "location4_other_ap", "location4_hp", "location4_hp_max_base", "location4_hp_max_other", "location4_details", "location4_armor_type", "location4_armor_enc"], function(v) {
            if((v["chest_armor_ap"]) && ((v["location4_armor_ap"] === undefined) || (v["location4_armor_ap"] === ""))) {
                location4_newattrs["location4_armor_ap"] = v.chest_armor_ap;
            }
            if((v["chest_armor_equipped"]) && ((v["location4_armor_equipped"] === undefined) || (v["location4_armor_equipped"] === ""))) {
                location4_newattrs["location4_armor_equipped"] = v.chest_armor_equipped;
            }
            if((v["chest_other_ap"]) && ((v["location4_other_ap"] === undefined) || (v["location4_other_ap"] === ""))) {
                location4_newattrs["location4_other_ap"] = v.chest_other_ap;
            }
            if((v["chest_hp"]) && ((v["location4_hp"] === undefined) || (v["location4_hp"] === ""))) {
                location4_newattrs["location4_hp"] = v.chest_hp;
            }
            if((v["chest_hp_max_base"]) && ((v["location4_hp_max_base"] === undefined) || (v["location4_hp_max_base"] === ""))) {
                location4_newattrs["location4_hp_max_base"] = v.chest_hp_max_base;
            }
            if((v["chest_hp_max_other"]) && ((v["location4_hp_max_other"] === undefined) || (v["location4_hp_max_other"] === ""))) {
                location4_newattrs["location4_hp_max_other"] = v.chest_hp_max_other;
            }
            if((v["chest_details"]) && ((v["location4_details"] === undefined) || (v["location4_details"] === ""))) {
                location4_newattrs["location4_details"] = v.chest_details;
            }
            if((v["chest_armor_type"]) && ((v["location4_armor_type"] === undefined) || (v["location4_armor_type"] === ""))) {
                location4_newattrs["location4_armor_type"] = v.chest_armor_type;
            }
            if((v["chest_armor_enc"]) && ((v["location4_armor_enc"] === undefined) || (v["location4_armor_enc"] === ""))) {
                location4_newattrs["location4_armor_enc"] = v.chest_armor_enc;
            }
            console.log("Setting hit location4 values copied from chest");
            setAttrs(location4_newattrs);
        });
        
        var location5_newattrs = {};
        getAttrs(["right_arm_armor_ap", "right_arm_armor_equipped", "right_arm_other_ap", "right_arm_hp", "right_arm_hp_max_base", "right_arm_hp_max_other", "right_arm_details", "right_arm_armor_type", "right_arm_armor_enc", "location5_armor_ap", "location5_armor_equipped", "location5_other_ap", "location5_hp", "location5_hp_max_base", "location5_hp_max_other", "location5_details", "location5_armor_type", "location5_armor_enc"], function(v) {
            if((v["right_arm_armor_ap"]) && ((v["location5_armor_ap"] === undefined) || (v["location5_armor_ap"] === ""))) {
                location5_newattrs["location5_armor_ap"] = v.right_arm_armor_ap;
            }
            if((v["right_arm_armor_equipped"]) && ((v["location5_armor_equipped"] === undefined) || (v["location5_armor_equipped"] === ""))) {
                location5_newattrs["location5_armor_equipped"] = v.right_arm_armor_equipped;
            }
            if((v["right_arm_other_ap"]) && ((v["location5_other_ap"] === undefined) || (v["location5_other_ap"] === ""))) {
                location5_newattrs["location5_other_ap"] = v.right_arm_other_ap;
            }
            if((v["right_arm_hp"]) && ((v["location5_hp"] === undefined) || (v["location5_hp"] === ""))) {
                location5_newattrs["location5_hp"] = v.right_arm_hp;
            }
            if((v["right_arm_hp_max_base"]) && ((v["location5_hp_max_base"] === undefined) || (v["location5_hp_max_base"] === ""))) {
                location5_newattrs["location5_hp_max_base"] = v.right_arm_hp_max_base;
            }
            if((v["right_arm_hp_max_other"]) && ((v["location5_hp_max_other"] === undefined) || (v["location5_hp_max_other"] === ""))) {
                location5_newattrs["location5_hp_max_other"] = v.right_arm_hp_max_other;
            }
            if((v["right_arm_details"]) && ((v["location5_details"] === undefined) || (v["location5_details"] === ""))) {
                location5_newattrs["location5_details"] = v.right_arm_details;
            }
            if((v["right_arm_armor_type"]) && ((v["location5_armor_type"] === undefined) || (v["location5_armor_type"] === ""))) {
                location5_newattrs["location5_armor_type"] = v.right_arm_armor_type;
            }
            if((v["right_arm_armor_enc"]) && ((v["location5_armor_enc"] === undefined) || (v["location5_armor_enc"] === ""))) {
                location5_newattrs["location5_armor_enc"] = v.right_arm_armor_enc;
            }
            console.log("Setting hit location5 values copied from right_arm");
            setAttrs(location5_newattrs);
        });
        
        var location6_newattrs = {};
        getAttrs(["left_arm_armor_ap", "left_arm_armor_equipped", "left_arm_other_ap", "left_arm_hp", "left_arm_hp_max_base", "left_arm_hp_max_other", "left_arm_details", "left_arm_armor_type", "left_arm_armor_enc", "location6_armor_ap", "location6_armor_equipped", "location6_other_ap", "location6_hp", "location6_hp_max_base", "location6_hp_max_other", "location6_details", "location6_armor_type", "location6_armor_enc"], function(v) {
            if((v["left_arm_armor_ap"]) && ((v["location6_armor_ap"] === undefined) || (v["location6_armor_ap"] === ""))) {
                location6_newattrs["location6_armor_ap"] = v.left_arm_armor_ap;
            }
            if((v["left_arm_armor_equipped"]) && ((v["location6_armor_equipped"] === undefined) || (v["location6_armor_equipped"] === ""))) {
                location6_newattrs["location6_armor_equipped"] = v.left_arm_armor_equipped;
            }
            if((v["left_arm_other_ap"]) && ((v["location6_other_ap"] === undefined) || (v["location6_other_ap"] === ""))) {
                location6_newattrs["location6_other_ap"] = v.left_arm_other_ap;
            }
            if((v["left_arm_hp"]) && ((v["location6_hp"] === undefined) || (v["location6_hp"] === ""))) {
                location6_newattrs["location6_hp"] = v.left_arm_hp;
            }
            if((v["left_arm_hp_max_base"]) && ((v["location6_hp_max_base"] === undefined) || (v["location6_hp_max_base"] === ""))) {
                location6_newattrs["location6_hp_max_base"] = v.left_arm_hp_max_base;
            }
            if((v["left_arm_hp_max_other"]) && ((v["location6_hp_max_other"] === undefined) || (v["location6_hp_max_other"] === ""))) {
                location6_newattrs["location6_hp_max_other"] = v.left_arm_hp_max_other;
            }
            if((v["left_arm_details"]) && ((v["location6_details"] === undefined) || (v["location6_details"] === ""))) {
                location6_newattrs["location6_details"] = v.left_arm_details;
            }
            if((v["left_arm_armor_type"]) && ((v["location6_armor_type"] === undefined) || (v["location6_armor_type"] === ""))) {
                location6_newattrs["location6_armor_type"] = v.left_arm_armor_type;
            }
            if((v["left_arm_armor_enc"]) && ((v["location6_armor_enc"] === undefined) || (v["location6_armor_enc"] === ""))) {
                location6_newattrs["location6_armor_enc"] = v.left_arm_armor_enc;
            }
            console.log("Setting hit location6 values copied from left_arm");
            setAttrs(location6_newattrs);
        });
        
        var location7_newattrs = {};
        getAttrs(["head_armor_ap", "head_armor_equipped", "head_other_ap", "head_hp", "head_hp_max_base", "head_hp_max_other", "head_details", "head_armor_type", "head_armor_enc", "location7_armor_ap", "location7_armor_equipped", "location7_other_ap", "location7_hp", "location7_hp_max_base", "location7_hp_max_other", "location7_details", "location7_armor_type", "location7_armor_enc"], function(v) {
            if((v["head_armor_ap"]) && ((v["location7_armor_ap"] === undefined) || (v["location7_armor_ap"] === ""))) {
                location7_newattrs["location7_armor_ap"] = v.head_armor_ap;
            }
            if((v["head_armor_equipped"]) && ((v["location7_armor_equipped"] === undefined) || (v["location7_armor_equipped"] === ""))) {
                location7_newattrs["location7_armor_equipped"] = v.head_armor_equipped;
            }
            if((v["head_other_ap"]) && ((v["location7_other_ap"] === undefined) || (v["location7_other_ap"] === ""))) {
                location7_newattrs["location7_other_ap"] = v.head_other_ap;
            }
            if((v["head_hp"]) && ((v["location7_hp"] === undefined) || (v["location7_hp"] === ""))) {
                location7_newattrs["location7_hp"] = v.head_hp;
            }
            if((v["head_hp_max_base"]) && ((v["location7_hp_max_base"] === undefined) || (v["location7_hp_max_base"] === ""))) {
                location7_newattrs["location7_hp_max_base"] = v.head_hp_max_base;
            }
            if((v["head_hp_max_other"]) && ((v["location7_hp_max_other"] === undefined) || (v["location7_hp_max_other"] === ""))) {
                location7_newattrs["location7_hp_max_other"] = v.head_hp_max_other;
            }
            if((v["head_details"]) && ((v["location7_details"] === undefined) || (v["location7_details"] === ""))) {
                location7_newattrs["location7_details"] = v.head_details;
            }
            if((v["head_armor_type"]) && ((v["location7_armor_type"] === undefined) || (v["location7_armor_type"] === ""))) {
                location7_newattrs["location7_armor_type"] = v.head_armor_type;
            }
            if((v["head_armor_enc"]) && ((v["location7_armor_enc"] === undefined) || (v["location7_armor_enc"] === ""))) {
                location7_newattrs["location7_armor_enc"] = v.head_armor_enc;
            }
            console.log("Setting hit location7 values copied from head");
            setAttrs(location7_newattrs);
        });
    }
    
    function upgrade_1_5_2_to_1_6_0() {
        console.log("convert traits into repeating fieldset");
        getAttrs(["traits", "npc_traits"], function(v) {
            var traitid = generateRowID();
            var npctraitattrs = {};
            var traitattrs = {};
            npctraitattrs["repeating_npctrait_" + traitid + "_trait"] = v["npc_traits"];
            setAttrs(npctraitattrs);
            traitattrs["repeating_trait_" + traitid + "_trait"] = v["traits"];
            setAttrs(traitattrs);
        });
        
        console.log("merge weapon effects and traits");
        getSectionIDs("shield", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
                var id = idarray[i];
                getAttrs(["repeating_shield_" + id + "_effects", "repeating_shield_" + id + "_traits"], function(v) {
                    var effects = v["repeating_shield_" + id + "_effects"];
                    var traits = v["repeating_shield_" + id + "_traits"];
                    shieldattrs = {};
                    if (effects == "") {
                        shieldattrs["repeating_shield_" + id + "_notes"] =  traits;
                    } else if (traits == "") {
                        shieldattrs["repeating_shield_" + id + "_notes"] = effects;
                    } else {
                        shieldattrs["repeating_shield_" + id + "_notes"] = effects + "/" + traits;
                    }
                    setAttrs(shieldattrs);
                });
            }
        });
        
        getSectionIDs("meleeweapon", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
                var id = idarray[i];
                getAttrs(["repeating_meleeweapon_" + id + "_effects", "repeating_meleeweapon_" + id + "_traits"], function(v) {
                    var effects = v["repeating_meleeweapon_" + id + "_effects"];
                    var traits = v["repeating_meleeweapon_" + id + "_traits"];
                    meleeweaponattrs = {};
                    if (effects == "") {
                        meleeweaponattrs["repeating_meleeweapon_" + id + "_notes"] =  traits;
                    } else if (traits == "") {
                        meleeweaponattrs["repeating_meleeweapon_" + id + "_notes"] = effects;
                    } else {
                        meleeweaponattrs["repeating_meleeweapon_" + id + "_notes"] = effects + "/" + traits;
                    }
                    setAttrs(meleeweaponattrs);
                });
            }
        });
        
        getSectionIDs("missileweapon", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
                var id = idarray[i];
                getAttrs(["repeating_missileweapon_" + id + "_effects", "repeating_missileweapon_" + id + "_traits"], function(v) {
                    var effects = v["repeating_missileweapon_" + id + "_effects"];
                    var traits = v["repeating_missileweapon_" + id + "_traits"];
                    missileweaponattrs = {};
                    if (effects == "") {
                        missileweaponattrs["repeating_missileweapon_" + id + "_notes"] =  traits;
                    } else if (traits == "") {
                        missileweaponattrs["repeating_missileweapon_" + id + "_notes"] = effects;
                    } else {
                        missileweaponattrs["repeating_missileweapon_" + id + "_notes"] = effects + "/" + traits;
                    }
                    setAttrs(missileweaponattrs);
                });
            }
        });
        
        getSectionIDs("firearm", function(idarray) {
            for(var i=0; i < idarray.length; i++) {
                var id = idarray[i];
                getAttrs(["repeating_firearm_" + id + "_traits"], function(v) {
                    var traits = v["repeating_firearm_" + id + "_traits"];
                    firearmattrs = {};
                    firearmattrs["repeating_firearm_" + id + "_notes"] =  traits;
                    setAttrs(firearmattrs);
                });
            }
        });
    }
    
    function upgrade_1_7_0_to_1_8_0() {
        console.log("copy gear_enc to loadout_enc");
        var newattrs = {};
        getAttrs(["gear_enc", "la_psionics_enabled_option", "display_la_psionics"], function(v) {
            if(v["gear_enc"]) {
                newattrs["loadout_enc"] = v.gear_enc;
            }
            console.log("Setting loadout_enc value copied from gear_enc");
            if(v["la_psionics_enabled_option"]) {
                newattrs["mythras_psionics_enabled_option"] = v.la_psionics_enabled_option;
            }
            console.log("Setting mythras_psionics_enabled_option value copied from la_psionics_enabled_option");
            if(v["display_la_psionics"]) {
                newattrs["display_mythras_psionics"] = v.display_la_psionics;
            }
            console.log("Setting display_mythras_psionics value copied from display_la_psionics");
            setAttrs(newattrs);
        });
    }
    
    function upgrade_1_9_1_to_2_0_0() {
        console.log("upgrading to v2.0.0");

        var newattrs = {};
        getAttrs(["fatigue", "action_points_swiftness", "damage_mod_mighty", "healing_rate_healthy", "hit_locations_robust"], function(v) {
            // COnvert Fatigue to Number Base
            if(v["fatigue"] === "Fresh") {
                newattrs["fatigue"] = 9;
            }
            else if(v["fatigue"] === "Winded") {
                newattrs["fatigue"] = 8;
            }
            else if(v["fatigue"] === "Tired") {
                newattrs["fatigue"] = 7;
            }
            else if(v["fatigue"] === "Wearied") {
                newattrs["fatigue"] = 6;
            }
            else if(v["fatigue"] === "Exhausted") {
                newattrs["fatigue"] = 5;
            }
            else if(v["fatigue"] === "Debilitated") {
                newattrs["fatigue"] = 4;
            }
            else if(v["fatigue"] === "Incapacitated") {
                newattrs["fatigue"] = 3;
            }
            else if(v["fatigue"] === "Semi-Conscious") {
                newattrs["fatigue"] = 2;
            }
            else if(v["fatigue"] === "Comatose") {
                newattrs["fatigue"] = 1;
            }
            else if(v["fatigue"] === "Dead") {
                newattrs["fatigue"] = 0;
            }
            else {
                newattrs["fatigue"] = 9;
            }
            
            newattrs["action_points_add_one"] = v.action_points_swiftness;
            newattrs["damage_mod_add_pow"] = v.damage_mod_mighty;
            newattrs["damage_mod_double"] = v.healing_rate_healthy;
            newattrs["hp_use_pow"] = v.hit_locations_robust;
            
            setAttrs(newattrs);
        });
        
        calc_str();
        calc_con();
        calc_siz();
        calc_dex();
        calc_int();
        calc_pow();
        calc_cha();
    }
    
    var versioning = function() {
        getAttrs(["version"], function(v) {
            if(!v["version"] || v["version"] === "") {
                console.log("setting initial version at 1.0");
                setAttrs({version: "1.0"});
                versioning();
            }
            else if(v["version"] === "1.0") {
                console.log("upgrading to v1.1");
                upgrade_1_0_to_1_1();
                setAttrs({version: "1.1"});
                versioning();
            }
            else if(v["version"] === "1.1") {
                console.log("upgrading to v1.2.0");
                upgrade_1_1_to_1_2_0();
                setAttrs({version: "1.2.0"});
                versioning();
            }
            else if(v["version"] === "1.2.0") {
                console.log("upgrading to v1.3.2");
                upgrade_1_2_0_to_1_3_0();
                setAttrs({version: "1.3.2"});
                versioning();
            }
            else if(v["version"] === "1.3.0") {
                console.log("upgrading to v1.3.1");
                // upgrade_1_2_0_to_1_3_0();
                setAttrs({version: "1.3.1"});
                versioning();
            }
            else if(v["version"] === "1.3.1") {
                console.log("upgrading to v1.3.2");
                upgrade_1_2_0_to_1_3_0();
                setAttrs({version: "1.3.2"});
                versioning();
            }
            else if(v["version"] === "1.3.2") {
                console.log("upgrading to v1.3.3");
                setAttrs({version: "1.3.3"});
                versioning();
            }
            else if(v["version"] === "1.3.3") {
                console.log("upgrading to v1.4.0");
                setAttrs({version: "1.4.0"});
                versioning();
            }
            else if(v["version"] === "1.4.0") {
                console.log("upgrading to v1.4.1");
                setAttrs({version: "1.4.1"});
                versioning();
            }
            else if(v["version"] === "1.4.1") {
                console.log("upgrading to v1.5.0");
                setAttrs({version: "1.5.0"});
                versioning();
            }
            else if(v["version"] === "1.5.0") {
                console.log("upgrading to v1.5.1");
                setAttrs({version: "1.5.1"});
                versioning();
            }
            else if(v["version"] === "1.5.1") {
                console.log("upgrading to v1.5.2");
                setAttrs({version: "1.5.2"});
                versioning();
            }
            else if(v["version"] === "1.5.2") {
                console.log("upgrading to v1.6.0");
                upgrade_1_5_2_to_1_6_0();
                setAttrs({version: "1.6.0"});
                versioning();
            }
            else if(v["version"] === "1.6.0") {
                console.log("upgrading to v1.7.0");
                setAttrs({version: "1.7.0"});
                versioning();
            }
            else if(v["version"] === "1.7.0") {
                console.log("upgrading to v1.8.0");
                upgrade_1_7_0_to_1_8_0();
                setAttrs({version: "1.8.0"});
                versioning();
            }
            else if(v["version"] === "1.8.0") {
                console.log("upgrading to v1.8.1");
                setAttrs({version: "1.8.1"});
                versioning();
            }
            else if(v["version"] === "1.8.1") {
                console.log("upgrading to v1.9.0");
                setAttrs({version: "1.9.0"});
                versioning();
            }
            else if(v["version"] === "1.9.0") {
                console.log("upgrading to v1.9.1");
                setAttrs({version: "1.9.1"});
                versioning();
            }
            else if(v["version"] === "1.9.1") {
                console.log("upgrading to v2.0.0");
                upgrade_1_9_1_to_2_0_0();
                setAttrs({version: "2.0.0"});
                versioning();
            }
            else {
                console.log("Sheet fully updated");
            }
        });
    }
    
    var campaign_options = function() {
        getAttrs(["setting_option", "luck_points_rank_option", "vehicle_type_option", "extended_conflict_enabled_option", "simplified_combat_enabled_option", "action_points_calc_option", "tenacity_enabled_option", "luther_arkwright_style_option", "m_space_style_option", "boating_standard_option", "status_standard_option", "superstition_standard_option", "linguistics_enabled_option", "dependencies_enabled_option", "firearms_enabled_option", "reach_enabled_option", "affiliations_enabled_option", "ms_psionics_enabled_option", "roman_magic_enabled_option", "arcane_magic_enabled_option", "divine_magic_enabled_option", "folk_magic_enabled_option", "fae_powers_enabled_option", "folk_magic_range_multiplier_option", "animism_enabled_option", "mysticism_enabled_option", "mythras_psionics_enabled_option", "sorcery_enabled_option", "theism_enabled_option", "max_devotional_pool_based_on_option"], function(v) {
            var newoptions = {};
            // Default Setting Configs
            var setting_configs = {
                sheet_style: "default",
                extended_conflict_enabled: "0",
                simplified_combat_enabled: "0",
                action_points_calc: "calculate",
                luck_points_rank: "0",
                tenacity_enabled: "0",
                boating_standard: "1",
                status_standard: "0",
                superstition_standard: "0",
                linguistics_enabled: "0",
                dependencies_enabled: "0",
                firearms_enabled: "0",
                reach_enabled: "1",
                ms_psionics_enabled: "0",
                roman_magic_enabled: "0",
                arcane_magic_enabled: "0",
                divine_magic_enabled: "0",
                fae_powers_enabled: "0",
                folk_magic_enabled: "1",
                folk_magic_range_multiplier: "1",
                animism_enabled: "1",
                mysticism_enabled: "1",
                mythras_psionics_enabled: "0",
                sorcery_enabled: "1",
                theism_enabled: "1",
                affiliations_enabled: "0",
                vehicle_type: "ships",
                max_devotional_pool_based_on: "@{rank_devotion_pool_limit}",
            };
            // Setting Overrides
            if(v["setting_option"] === "luther_arkwright") {
                setting_configs["sheet_style"] = "luther_arkwright";
                setting_configs["tenacity_enabled"] = "1";
                setting_configs["boating_standard"] = "0";
                setting_configs["linguistics_enabled"] = "1";
                setting_configs["dependencies_enabled"] = "1";
                setting_configs["firearms_enabled"] = "1";
                setting_configs["folk_magic_enabled"] = "0";
                setting_configs["animism_enabled"] = "0";
                setting_configs["sorcery_enabled"] = "0";
                setting_configs["theism_enabled"] = "0";
                setting_configs["mythras_psionics_enabled"] = "1";
                setting_configs["vehicle_type"] = "mythras";
            } else if(v["setting_option"] === "classic_fantasy") {
                setting_configs["sheet_style"] = "classic_fantasy";
                setting_configs["luck_points_rank"] = "1";
                setting_configs["arcane_magic_enabled"] = "1";
                setting_configs["divine_magic_enabled"] = "1";
                setting_configs["folk_magic_enabled"] = "0";
                setting_configs["animism_enabled"] = "0";
                setting_configs["sorcery_enabled"] = "0";
                setting_configs["theism_enabled"] = "0";
            } else if(v["setting_option"] === "m-space") {
                setting_configs["sheet_style"] = "m-space";
                setting_configs["extended_conflict_enabled"] = "1",
                setting_configs["action_points_calc"] = "set_2";
                setting_configs["firearms_enabled"] = "1";
                setting_configs["reach_enabled"] = "0";
                setting_configs["ms_psionics_enabled"] = "1";
                setting_configs["folk_magic_enabled"] = "0";
                setting_configs["animism_enabled"] = "0";
                setting_configs["mysticism_enabled"] = "0";
                setting_configs["sorcery_enabled"] = "0";
                setting_configs["theism_enabled"] = "0";
                setting_configs["vehicle_type"] = "mspace";
            } else if(v["setting_option"] === "monster_island") {
                setting_configs["status_standard"] = "1";
                setting_configs["folk_magic_enabled"] = "0";
                setting_configs["mysticism_enabled"] = "0";
            } else if(v["setting_option"] === "mythic_britain") {
                setting_configs["superstition_standard"] = "1";
                setting_configs["folk_magic_enabled"] = "0";
                setting_configs["mysticism_enabled"] = "0";
                setting_configs["sorcery_enabled"] = "0";
            } else if(v["setting_option"] === "thennla") {
                setting_configs["sheet_style"] = "thennla";
            } else if(v["setting_option"] === "mythic_constantinople") {
                setting_configs["affiliations_enabled"] = "1";
                setting_configs["max_devotional_pool_based_on"] = "@{pow}";
            } else if(v["setting_option"] === "mythic_rome") {
                setting_configs["status_standard"] = "1";
                setting_configs["roman_magic_enabled"] = "1";
                setting_configs["folk_magic_enabled"] = "0";
                setting_configs["animism_enabled"] = "0";
                setting_configs["mysticism_enabled"] = "0";
                setting_configs["sorcery_enabled"] = "0";
                setting_configs["theism_enabled"] = "0";
            } else if(v["setting_option"] === "after_the_vampire_wars") {
                setting_configs["linguistics_enabled"] = "1";
                setting_configs["tenacity_enabled"] = "1";
                setting_configs["animism_enabled"] = "0";
                setting_configs["theism_enabled"] = "0";
                setting_configs["fae_powers_enabled"] = "1";
                setting_configs["mythras_psionics_enabled"] = "1";
                setting_configs["vehicle_type"] = "mythras";
                setting_configs["firearms_enabled"] = "1";
                setting_configs["folk_magic_range_multiplier"] = ".2";
            } else if(v["setting_option"] === "mythras_imperative") {
                setting_configs["action_points_calc"] = "set_2";
                setting_configs["reach_enabled"] = "0";
            } else {}
            
            // Sheet Style
            newoptions["sheet_style"] = setting_configs["sheet_style"];
            
            // Extended Conflict Resolution Enabled
            if(v["extended_conflict_enabled_option"] === "default") {
                newoptions["extended_conflict_enabled"] = setting_configs["extended_conflict_enabled"];
            } else {
                newoptions["extended_conflict_enabled"] = v["extended_conflict_enabled_option"];
            }
            
            // Vehicle Type
            if(v["vehicle_type_option"] === "default") {
                newoptions["vehicle_type"] = setting_configs["vehicle_type"];
            } else {
                newoptions["vehicle_type"] = v["vehicle_type_option"];
            }
            
            // Simplified Combat Enabled
            if(v["simplified_combat_enabled_option"] === "default") {
                newoptions["simplified_combat_enabled"] = setting_configs["simplified_combat_enabled"];
            } else {
                newoptions["simplified_combat_enabled"] = v["simplified_combat_enabled_option"];
            }
            
            // Action Points Calculation Option
            if(v["action_points_calc_option"] === "default") {
                newoptions["action_points_calc"] = setting_configs["action_points_calc"];
            } else {
                newoptions["action_points_calc"] = v["action_points_calc_option"];
            }
            
            // Add Rank to Luck
            if(v["luck_points_rank_option"] === "default") {
                newoptions["luck_points_rank"] = setting_configs["luck_points_rank"];
            } else {
                newoptions["luck_points_rank"] = v["luck_points_rank_option"];
            }
            
            // Tenacity Enabled
            if(v["tenacity_enabled_option"] === "default") {
                newoptions["tenacity_enabled"] = setting_configs["tenacity_enabled"];
            } else {
                newoptions["tenacity_enabled"] = v["tenacity_enabled_option"];
            }
            
            // Boating Standard
            if(v["boating_standard_option"] === "default") {
                newoptions["boating_standard"] = setting_configs["boating_standard"];
            } else {
                newoptions["boating_standard"] = v["boating_standard_option"];
            }
            
            // Status Standard
            if(v["status_standard_option"] === "default") {
                newoptions["status_standard"] = setting_configs["status_standard"];
            } else {
                newoptions["status_standard"] = v["status_standard_option"];
            }
            
            // Superstition Standard
            if(v["superstition_standard_option"] === "default") {
                newoptions["superstition_standard"] = setting_configs["superstition_standard"];
            } else {
                newoptions["superstition_standard"] = v["superstition_standard_option"];
            }
            
            // Linguistics Enabled
            if(v["linguistics_enabled_option"] === "default") {
                newoptions["linguistics_enabled"] = setting_configs["linguistics_enabled"];
            } else {
                newoptions["linguistics_enabled"] = v["linguistics_enabled_option"];
            }
            
            // Dependencie Enabled
            if(v["dependencies_enabled_option"] === "default") {
                newoptions["dependencies_enabled"] = setting_configs["dependencies_enabled"];
            } else {
                newoptions["dependencies_enabled"] = v["dependencies_enabled_option"];
            }
            
            // Firearms Enabled
            if(v["firearms_enabled_option"] === "default") {
                newoptions["firearms_enabled"] = setting_configs["firearms_enabled"];
            } else {
                newoptions["firearms_enabled"] = v["firearms_enabled_option"];
            }
            
            // Reach Enabled
            if(v["reach_enabled_option"] === "default") {
                newoptions["reach_enabled"] = setting_configs["reach_enabled"];
            } else {
                newoptions["reach_enabled"] = v["reach_enabled_option"];
            }
            
            // M-Space Psionics Enabled
            if(v["ms_psionics_enabled_option"] === "default") {
                newoptions["ms_psionics_enabled"] = setting_configs["ms_psionics_enabled"];
            } else {
                newoptions["ms_psionics_enabled"] = v["ms_psionics_enabled_option"];
            }
            
            // Roman Magic Enabled
            if(v["roman_magic_enabled_option"] === "default") {
                newoptions["roman_magic_enabled"] = setting_configs["roman_magic_enabled"];
            } else {
                newoptions["roman_magic_enabled"] = v["roman_magic_enabled_option"];
            }
            
            // Arcane Magic Enabled
            if(v["arcane_magic_enabled_option"] === "default") {
                newoptions["arcane_magic_enabled"] = setting_configs["arcane_magic_enabled"];
            } else {
                newoptions["arcane_magic_enabled"] = v["arcane_magic_enabled_option"];
            }
            
            // Divine Magic Enabled
            if(v["divine_magic_enabled_option"] === "default") {
                newoptions["divine_magic_enabled"] = setting_configs["divine_magic_enabled"];
            } else {
                newoptions["divine_magic_enabled"] = v["divine_magic_enabled_option"];
            }
            
             // Fae Powers Enabled
            if(v["fae_powers_enabled_option"] === "default") {
                newoptions["fae_powers_enabled"] = setting_configs["fae_powers_enabled"];
            } else {
                newoptions["fae_powers_enabled"] = v["fae_powers_enabled_option"];
            }
            
            // Folk Magic Enabled
            if(v["folk_magic_enabled_option"] === "default") {
                newoptions["folk_magic_enabled"] = setting_configs["folk_magic_enabled"];
            } else {
                newoptions["folk_magic_enabled"] = v["folk_magic_enabled_option"];
            }
            
            // Folk Magic Range Multiplier
            if(v["folk_magic_range_multiplier_option"] === "default") {
                newoptions["folk_magic_range_multiplier"] = setting_configs["folk_magic_range_multiplier"];
            } else {
                newoptions["folk_magic_range_multiplier"] = v["folk_magic_range_multiplier_option"];
            }
            
            // Animism Enabled
            if(v["animism_enabled_option"] === "default") {
                newoptions["animism_enabled"] = setting_configs["animism_enabled"];
            } else {
                newoptions["animism_enabled"] = v["animism_enabled_option"];
            }
            
            // Mysticism Enabled
            if(v["mysticism_enabled_option"] === "default") {
                newoptions["mysticism_enabled"] = setting_configs["mysticism_enabled"];
            } else {
                newoptions["mysticism_enabled"] = v["mysticism_enabled_option"];
            }
            
            // Mythras Psionics Enabled
            if(v["mythras_psionics_enabled_option"] === "default") {
                newoptions["mythras_psionics_enabled"] = setting_configs["mythras_psionics_enabled"];
            } else {
                newoptions["mythras_psionics_enabled"] = v["mythras_psionics_enabled_option"];
            }
            
            // Sorcery Enabled
            if(v["sorcery_enabled_option"] === "default") {
                newoptions["sorcery_enabled"] = setting_configs["sorcery_enabled"];
            } else {
                newoptions["sorcery_enabled"] = v["sorcery_enabled_option"];
            }
            
            // Theism Enabled
            if(v["theism_enabled_option"] === "default") {
                newoptions["theism_enabled"] = setting_configs["theism_enabled"];
            } else {
                newoptions["theism_enabled"] = v["theism_enabled_option"];
            }
            
             // Max Devotional Pool Based On
            if(v["max_devotional_pool_based_on_option"] === "default") {
                newoptions["max_devotional_pool_based_on"] = setting_configs["max_devotional_pool_based_on"];
            } else {
                newoptions["max_devotional_pool_based_on"] = v["max_devotional_pool_based_on_option"];
            }
            
            // Affiliations Enabled
            if(v["affiliations_enabled_option"] === "default") {
                newoptions["affiliations_enabled"] = setting_configs["affiliations_enabled"];
            } else {
                newoptions["affiliations_enabled"] = v["affiliations_enabled_option"];
            }
            
            setAttrs(newoptions);
        });
    }
    
	function find_damage_mod_step(value) {
		if (value >= 171) {
			return 23;
		} else if (value >= 161) {
			return 22;
		} else if (value >= 151) {
			return 21;
		} else if (value >= 141) {
			return 20;
		} else if (value >= 131) {
			return 19;
		} else if (value >= 121) {
			return 18;
		} else if (value >= 111) {
			return 17;
		} else if (value >= 101) {
			return 16;
		} else if (value >= 91) {
			return 15;
		} else if (value >= 81) {
			return 14;
		} else if (value >= 71) {
			return 13;
		} else if (value >= 61) {
			return 12;
		} else if (value >= 51) {
			return 11;
		} else if (value >= 46) {
			return 10;
		} else if (value >= 41) {
			return 9;
		} else if (value >= 36) {
			return 8;
		} else if (value >= 31) {
			return 7;
		} else if (value >= 26) {
			return 6;
		} else if (value >= 21) {
			return 5;
		} else if (value >= 16) {
			return 4;
		} else if (value >= 11) {
			return 3;
		} else if (value >= 6) {
			return 2;
		} else {
			return 1;
		}
	}

	function find_damage_mod(step) {
		if (step == 1) {
			return "-1d8";
		} else if (step == 2) {
			return "-1d6";
		} else if (step == 3) {
			return "-1d4";
		} else if (step == 4) {
			return "-1d2";
		} else if (step == 5) {
			return "0";
		} else if (step == 6) {
			return "1d2";
		} else if (step == 7) {
			return "1d4";
		} else if (step == 8) {
			return "1d6";
		} else if (step == 9) {
			return "1d8";
		} else if (step == 10) {
			return "1d10";
		} else if (step == 11) {
			return "1d12";
		} else if (step == 12) {
			return "2d6";
		} else if (step == 13) {
			return "1d8+1d6";
		} else if (step == 14) {
			return "2d8";
		} else if (step == 15) {
			return "1d10+1d8";
		} else if (step == 16) {
			return "2d10";
		} else if (step == 17) {
			return "2d10+1d2";
		} else if (step == 18) {
			return "2d10+1d4";
		} else if (step == 19) {
			return "2d10+1d6";
		} else if (step == 20) {
			return "2d10+1d8";
		} else if (step == 21) {
			return "3d10";
		} else if (step == 22) {
			return "2d10+1d12";
		} else {
			return "2d10+2d6";
		}
	}
	
	
	
	// ##### Triggers #####
	// Characteristic Triggers
	on("change:str_base change:str_training change:str_ageing change:str_other change:str_temp", function() { calc_str(); });
	on("change:con_base change:con_training change:con_ageing change:con_other change:con_temp", function() { calc_con(); });
	on("change:siz_base change:siz_other change:siz_temp", function() { calc_siz(); });
	on("change:dex_base change:dex_training change:dex_ageing change:dex_other change:dex_temp", function() { calc_dex(); });
	on("change:int_base change:int_training change:int_ageing change:int_other change:int_temp", function() { calc_int(); });
	on("change:pow_base change:pow_training change:pow_ageing change:pow_other change:pow_temp", function() { calc_pow(); });
	on("change:cha_base change:cha_training change:cha_ageing change:cha_other change:cha_temp", function() { calc_cha(); });
	
	// Attribute Triggers
	on("change:dex change:int change:pow change:action_points_temp change:action_points_add_one change:action_points_other change:fatigue change:spirit change:action_points_calc", function() { calc_action_points(); });
	on("change:willpower_experience change:willpower_other change:willpower_augment change:binding_learned change:binding_base change:binding_experience change:binding_other change:binding_augment change:pow change:cha", function() { calc_spirit_damage(); });
	on("change:str change:siz change:pow change:damage_mod_add_pow change:damage_mod_other change:damage_mod_temp", function() { calc_damage_mod(); });
	on("change:cha change:experience_mod_temp change:experience_mod_other", function() { calc_experience_mod(); });
    on("change:healing_rate_temp change:healing_rate_other change:con change:healing_rate_double", function() { calc_healing_rate(); });
    on("change:dex change:int change:cha change:initiative_bonus_temp change:armor_penalty change:fatigue change:initiative_bonus_other change:spirit", function() { calc_initiative(); });
    on("change:pow", function() { calc_spirit_intensity(); });
    on("change:pow change:luck_points_temp change:luck_points_other change:luck_points_rank change:rank", function() { calc_luck_points(); });
    on("change:pow change:magic_points_temp change:magic_points_other", function() { calc_magic_points(); });
    on("change:pow change:tenacity_temp change:tenacity_other change:apply_dependencies_penalty change:repeating_dependency remove:repeating_dependency", function() { calc_tenacity(); });

    // HP Triggers
    on("change:con change:siz change:pow change:hp_use_pow", function() { calc_hp_max_base(); });
	
	//Simplified combat sets hit locations
	on("change:simplified_combat_enabled", function() {
	    getAttrs(["simplified_combat_enabled"], function(values) {
	        if (values.simplified_combat_enabled == "1") {
	            setAttrs({
	                hit_locations: "simplified",
	            });
	        }
	    });
	});
	
	// Mythras Vehicle Systems
	on("change:vehicle_size", function() {
	    getAttrs(["vehicle_size"], function(values) {
	        setAttrs({
			    vehicle_system1_hits: values.vehicle_size,
                vehicle_system2_hits: values.vehicle_size,
                vehicle_system3_hits: values.vehicle_size,
                vehicle_system4_hits: values.vehicle_size,
                vehicle_system5_hits: values.vehicle_size,
                vehicle_system6_hits: values.vehicle_size,
                vehicle_system7_hits: values.vehicle_size,
                vehicle_system8_hits: values.vehicle_size,
                vehicle_system9_hits: values.vehicle_size,
                vehicle_system10_hits: values.vehicle_size
            });
	    });     
	});    
	
	on("change:mythras_vehicle_type", function() {
	    getAttrs(["mythras_vehicle_type"], function(values) {
	        if (values.mythras_vehicle_type === "spaceship") {
	            setAttrs({
				    vehicle_system1_roll: 1, vehicle_system1_name: getTranslationByKey('avionics-u'),
                    vehicle_system2_roll: 2, vehicle_system2_name: getTranslationByKey('communications-u'),
                    vehicle_system3_roll: 3, vehicle_system3_name: getTranslationByKey('crew-u') + "/" + getTranslationByKey('passengers-u'),
                    vehicle_system4_roll: 4, vehicle_system4_name: getTranslationByKey('hold-u') + "/" + getTranslationByKey('hangar-bay-u'),
                    vehicle_system5_roll: 5, vehicle_system5_name: getTranslationByKey('hyperdrive-u'),
                    vehicle_system6_roll: 6, vehicle_system6_name: getTranslationByKey('reactor-core-u'),
                    vehicle_system7_roll: 7, vehicle_system7_name: getTranslationByKey('sensors-u'),
                    vehicle_system8_roll: 8, vehicle_system8_name: getTranslationByKey('shields-u'),
                    vehicle_system9_roll: 9, vehicle_system9_name: getTranslationByKey('sublight-drive-u'),
                    vehicle_system10_roll: 10, vehicle_system10_name: getTranslationByKey('weapons-u')
                });
	        } else {
	            setAttrs({
                    vehicle_system1_roll: 1, vehicle_system1_name: getTranslationByKey('cargo-compartment-u'),
                    vehicle_system2_roll: 2, vehicle_system2_name: getTranslationByKey('communications-u'),
                    vehicle_system3_roll: 3, vehicle_system3_name: getTranslationByKey('controls-u'),
                    vehicle_system4_roll: 4, vehicle_system4_name: getTranslationByKey('drive-u') + "/" + getTranslationByKey('repulsorlift-u'),
                    vehicle_system5_roll: 5, vehicle_system5_name: getTranslationByKey('crew-u') + "/" + getTranslationByKey('passengers-u'),
                    vehicle_system6_roll: 6, vehicle_system6_name: getTranslationByKey('power-core-u'),
                    vehicle_system7_roll: 7, vehicle_system7_name: getTranslationByKey('sensors-u'),
                    vehicle_system8_roll: 8, vehicle_system8_name: getTranslationByKey('weapons-u'),
                    vehicle_system9_roll: 0, vehicle_system9_name: "",
                    vehicle_system10_roll: 0, vehicle_system10_name: ""
	            });
	        }
	    });
	});
	
	// Hit Locations
	on("change:hit_locations", function() {
	    getAttrs(["hit_locations"], function(values) {
	        
	        if (values.hit_locations === "rabble") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit-points-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: 0,
                    location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: 0,
                    location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: 0,
                    location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: 0,
                    location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: 0,
                    location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: 0,
                    location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "simplified") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit-points-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: 0,
                    location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: 0,
                    location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: 0,
                    location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: 0,
                    location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: 0,
                    location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: 0,
                    location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "arachnid") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: -1,
                    location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('mid-right-leg-u'), location3_hp_max_base_mod: -1,
                    location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('mid-left-leg-u'), location4_hp_max_base_mod: -1,
                    location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('fore-right-leg-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('fore-left-leg-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('abdomen-u'), location7_hp_max_base_mod: 2,
                    location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front-right-leg-u'), location8_hp_max_base_mod: -1,
                    location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front-left-leg-u'), location9_hp_max_base_mod: -1,
                    location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('cephalothorax-u'), location10_hp_max_base_mod: 1,
                    location11_table_start: 0, location11_table_end: 0, location11_name: "", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: "", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "humanoid") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right-leg-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 10, location4_table_end: 12, location4_name: getTranslationByKey('chest-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 13, location5_table_end: 15, location5_name: getTranslationByKey('right-arm-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 16, location6_table_end: 18, location6_name: getTranslationByKey('left-arm-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head-u'), location7_hp_max_base_mod: 0,
                    location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "centaurid") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 7, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 9, location4_table_end: 10, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('front-right-leg-u'), location5_hp_max_base_mod: 0,
                    location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('front-left-leg-u'), location6_hp_max_base_mod: 0,
                    location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('chest-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 17, location8_table_end: 17, location8_name: getTranslationByKey('right-arm-u'), location8_hp_max_base_mod: -4,
                    location9_table_start: 18, location9_table_end: 18, location9_name: getTranslationByKey('left-arm-u'), location9_hp_max_base_mod: -4,
                    location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head-u'), location10_hp_max_base_mod: -3,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "decapoda") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: -1,
                    location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid-right-leg-u'), location3_hp_max_base_mod: -1,
                    location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid-left-leg-u'), location4_hp_max_base_mod: -1,
                    location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('fore-right-leg-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('fore-left-leg-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('front-right-leg-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('front-left-leg-u'), location8_hp_max_base_mod: -1,
                    location9_table_start: 9, location9_table_end: 10, location9_name: getTranslationByKey('abdomen-u'), location9_hp_max_base_mod: 1,
                    location10_table_start: 11, location10_table_end: 16, location10_name: getTranslationByKey('cephalothorax-u'), location10_hp_max_base_mod: 2,
                    location11_table_start: 17, location11_table_end: 18, location11_name: getTranslationByKey('right-pincer-u'), location11_hp_max_base_mod: 2,
                    location12_table_start: 19, location12_table_end: 20, location12_name: getTranslationByKey('left-pincer-u'), location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "decapodiform") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('tentacle-1-u'), location1_hp_max_base_mod: -1,
                    location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('tentacle-2-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('tentacle-3-u'), location3_hp_max_base_mod: -1,
                    location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('tentacle-4-u'), location4_hp_max_base_mod: -1,
                    location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('tentacle-5-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('tentacle-6-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('tentacle-7-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('tentacle-8-u'), location8_hp_max_base_mod: -1,
                    location9_table_start: 9, location9_table_end: 11, location9_name: getTranslationByKey('long-tentacle-1-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 12, location10_table_end: 14, location10_name: getTranslationByKey('long-tentacle-2-u'), location10_hp_max_base_mod: 0,
                    location11_table_start: 15, location11_table_end: 17, location11_name: getTranslationByKey('body-u'), location11_hp_max_base_mod: 2,
                    location12_table_start: 18, location12_table_end: 20, location12_name: getTranslationByKey('head-u'), location12_hp_max_base_mod: 1
			    });
	        } else if (values.hit_locations === "dorsal_finned_aquatic") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('dorsal-fin-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 7, location3_table_end: 10, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 11, location4_table_end: 14, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 15, location5_table_end: 16, location5_name: getTranslationByKey('right-fin-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 17, location6_table_end: 18, location6_name: getTranslationByKey('left-fin-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head-u'), location7_hp_max_base_mod: 0,
                    location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "draconic") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-right-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('rear-left-leg-u'), location3_hp_max_base_mod: 0,
                    location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('hindquarters-u'), location4_hp_max_base_mod: 1,
                    location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('right-wing-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('left-wing-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('forequarters-u'), location7_hp_max_base_mod: 2,
                    location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front-right-leg-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front-left-leg-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head-u'), location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "insect") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('right-rear-leg-u'), location1_hp_max_base_mod: -1,
                    location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('left-rear-leg-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid-right-leg-u'), location3_hp_max_base_mod: -1,
                    location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid-left-leg-u'), location4_hp_max_base_mod: -1,
                    location5_table_start: 5, location5_table_end: 9, location5_name: getTranslationByKey('abdomen-u'), location5_hp_max_base_mod: 1,
                    location6_table_start: 10, location6_table_end: 13, location6_name: getTranslationByKey('thorax-u'), location6_hp_max_base_mod: 2,
                    location7_table_start: 14, location7_table_end: 14, location7_name: getTranslationByKey('front-right-leg-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 15, location8_table_end: 15, location8_name: getTranslationByKey('front-left-leg-u'), location8_hp_max_base_mod: -1,
                    location9_table_start: 16, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "octopodiform") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tentacle-1-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('tentacle-2-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('tentacle-3-u'), location3_hp_max_base_mod: 0,
                    location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('tentacle-4-u'), location4_hp_max_base_mod: 0,
                    location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('tentacle-5-u'), location5_hp_max_base_mod: 0,
                    location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('tentacle-6-u'), location6_hp_max_base_mod: 0,
                    location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('tentacle-7-u'), location7_hp_max_base_mod: 0,
                    location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('tentacle-8-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('body-u'), location9_hp_max_base_mod: 1,
                    location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head-u'), location10_hp_max_base_mod: 2,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "pachyderm") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 5, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 9, location4_table_end: 12, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 13, location5_table_end: 14, location5_name: getTranslationByKey('front-right-leg-u'), location5_hp_max_base_mod: 0,
                    location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front-left-leg-u'), location6_hp_max_base_mod: 0,
                    location7_table_start: 17, location7_table_end: 17, location7_name: getTranslationByKey('trunk-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 18, location8_table_end: 20, location8_name: getTranslationByKey('head-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "quadruped") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 11, location5_table_end: 13, location5_name: getTranslationByKey('front-right-leg-u'), location5_hp_max_base_mod: 0,
                    location6_table_start: 14, location6_table_end: 16, location6_name: getTranslationByKey('front-left-leg-u'), location6_hp_max_base_mod: 0,
                    location7_table_start: 17, location7_table_end: 20, location7_name: getTranslationByKey('head-u'), location7_hp_max_base_mod: 0,
                    location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "serpentine") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-tip-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('mid-end-length-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('fore-end-length-u'), location3_hp_max_base_mod: 0,
                    location4_table_start: 8, location4_table_end: 9, location4_name: getTranslationByKey('rear-mid-length-u'), location4_hp_max_base_mod: 1,
                    location5_table_start: 10, location5_table_end: 12, location5_name: getTranslationByKey('mid-mid-length-u'), location5_hp_max_base_mod: 1,
                    location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('fore-mid-length-u'), location6_hp_max_base_mod: 1,
                    location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('rear-fore-length-u'), location7_hp_max_base_mod: 0,
                    location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('mid-fore-length-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "tailed_arachnid") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 3, location2_table_end: 3, location2_name: getTranslationByKey('rear-right-leg-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 4, location3_table_end: 4, location3_name: getTranslationByKey('rear-left-leg-u'), location3_hp_max_base_mod: -1,
                    location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid-right-leg-u'), location4_hp_max_base_mod: -1,
                    location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid-left-leg-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 7, location6_table_end: 7, location6_name: getTranslationByKey('fore-right-leg-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 8, location7_table_end: 8, location7_name: getTranslationByKey('fore-left-leg-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 9, location8_table_end: 12, location8_name: getTranslationByKey('thorax-u'), location8_hp_max_base_mod: 1,
                    location9_table_start: 13, location9_table_end: 15, location9_name: getTranslationByKey('right-pincer-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 16, location10_table_end: 18, location10_name: getTranslationByKey('left-pincer-u'), location10_hp_max_base_mod: 0,
                    location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('cephalothorax-u'), location11_hp_max_base_mod: 2,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "tailed_biped") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('right-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('left-leg-u'), location3_hp_max_base_mod: 0,
                    location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('abdomen-u'), location4_hp_max_base_mod: 1,
                    location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('chest-u'), location5_hp_max_base_mod: 2,
                    location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('right-arm-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('left-arm-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "tailed_quadruped") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('rear-right-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('rear-left-leg-u'), location3_hp_max_base_mod: 0,
                    location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('hindquarters-u'), location4_hp_max_base_mod: 1,
                    location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('forequarters-u'), location5_hp_max_base_mod: 2,
                    location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front-right-leg-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('front-left-leg-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "winged_biped") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right-leg-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 10, location4_table_end: 10, location4_name: getTranslationByKey('chest-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right-wing-u'), location5_hp_max_base_mod: 0,
                    location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left-wing-u'), location6_hp_max_base_mod: 0,
                    location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('right-arm-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('left-arm-u'), location8_hp_max_base_mod: -1,
                    location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "winged_insect") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: -1,
                    location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: -1,
                    location3_table_start: 3, location3_table_end: 4, location3_name: getTranslationByKey('metathorax-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid-right-leg-u'), location4_hp_max_base_mod: -1,
                    location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid-left-leg-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 7, location6_table_end: 10, location6_name: getTranslationByKey('prothorax-u'), location6_hp_max_base_mod: 2,
                    location7_table_start: 11, location7_table_end: 12, location7_name: getTranslationByKey('right-wing-u'), location7_hp_max_base_mod: -1,
                    location8_table_start: 13, location8_table_end: 14, location8_name: getTranslationByKey('left-wing-u'), location8_hp_max_base_mod: -1,
                    location9_table_start: 15, location9_table_end: 16, location9_name: getTranslationByKey('front-right-leg-u'), location9_hp_max_base_mod: -1,
                    location10_table_start: 17, location10_table_end: 18, location10_name: getTranslationByKey('front-left-leg-u'), location10_hp_max_base_mod: -1,
                    location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('head-u'), location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else if (values.hit_locations === "winged_quadruped") {
	            setAttrs({
				    location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                    location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                    location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                    location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                    location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right-wing-u'), location5_hp_max_base_mod: -1,
                    location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left-wing-u'), location6_hp_max_base_mod: -1,
                    location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('front-right-leg-u'), location7_hp_max_base_mod: 0,
                    location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('front-left-leg-u'), location8_hp_max_base_mod: 0,
                    location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: 0
			    });
	        } else {
	            setAttrs({
				    location1_table_start: 0, location1_table_end: 0, location1_name: "", location1_hp_max_base_mod: 0,
                    location2_table_start: 0, location2_table_end: 0, location2_name: "", location2_hp_max_base_mod: 0,
                    location3_table_start: 0, location3_table_end: 0, location3_name: "", location3_hp_max_base_mod: 0,
                    location4_table_start: 0, location4_table_end: 0, location4_name: "", location4_hp_max_base_mod: 0,
                    location5_table_start: 0, location5_table_end: 0, location5_name: "", location5_hp_max_base_mod: 0,
                    location6_table_start: 0, location6_table_end: 0, location6_name: "", location6_hp_max_base_mod: 0,
                    location7_table_start: 0, location7_table_end: 0, location7_name: "", location7_hp_max_base_mod: 0,
                    location8_table_start: 0, location8_table_end: 0, location8_name: "", location8_hp_max_base_mod: 0,
                    location9_table_start: 0, location9_table_end: 0, location9_name: "", location9_hp_max_base_mod: 0,
                    location10_table_start: 0, location10_table_end: 0, location10_name: "", location10_hp_max_base_mod: 0,
                    location11_table_start: 0, location11_table_end: 0, location11_name: "", location11_hp_max_base_mod: 0,
                    location12_table_start: 0, location12_table_end: 0, location12_name: "", location12_hp_max_base_mod: 0
			    });
	        }
	    });
	});
	
	//M-Space Spaceship Toggle
	on("change:msvehicle_maneuvering_tr change:msvehicle_engines_tr change:msvehicle_type change:msvehicle_tractor_beam change:msvehicle_storage change:msvehicle_sickbay change:msvehicle_sensors change:msvehicle_self_repair change:msvehicle_robot_arm change:msvehicle_rescue_utilities change:msvehicle_passengers change:msvehicle_open_space change:msvehicle_maneuvering change:msvehicle_lab change:msvehicle_hyperspace change:msvehicle_hanger change:msvehicle_environment change:msvehicle_extra_sensors change:msvehicle_escape_pod change:msvehicle_engines change:msvehicle_crew change:msvehicle_cockpit change:msvehicle_cargo change:msvehicle_airlock change:msvehicle_weapons", function() {
	    getAttrs(["msvehicle_engines_tr", "msvehicle_maneuvering_tr", "msvehicle_type", "msvehicle_tractor_beam", "msvehicle_storage", "msvehicle_sickbay", "msvehicle_sensors", "msvehicle_self_repair", "msvehicle_robot_arm", "msvehicle_rescue_utilities", "msvehicle_passengers", "msvehicle_open_space", "msvehicle_maneuvering", "msvehicle_lab", "msvehicle_hyperspace", "msvehicle_hanger", "msvehicle_environment", "msvehicle_extra_sensors", "msvehicle_escape_pod", "msvehicle_engines", "msvehicle_crew", "msvehicle_cockpit", "msvehicle_cargo", "msvehicle_airlock", "msvehicle_weapons"], function(values) {
	        var weapons = parseFloat(values.msvehicle_weapons);
	        var tractor_beam = parseFloat(values.msvehicle_tractor_beam);
	        var storage = parseFloat(values.msvehicle_storage);
	        var sickbay = parseFloat(values.msvehicle_sickbay);
	        var sensors = parseFloat(values.msvehicle_sensors);
	        var self_repair = parseFloat(values.msvehicle_self_repair);
	        var robot_arms = parseFloat(values.msvehicle_robot_arm);
	        var rescue_utilities = parseFloat(values.msvehicle_rescue_utilities);
	        var passengers = parseFloat(values.msvehicle_passengers);
	        var open_space = parseFloat(values.msvehicle_open_space);
	        var maneuvering = parseFloat(values.msvehicle_maneuvering);
	        var lab = parseFloat(values.msvehicle_lab);
	        var hyperspace = parseFloat(values.msvehicle_hyperspace);
	        var hanger = parseFloat(values.msvehicle_hanger);
	        var environment = parseFloat(values.msvehicle_environment);
	        var extra_sensors = parseFloat(values.msvehicle_extra_sensors);
	        var escape_pod = parseFloat(values.msvehicle_escape_pod);
	        var engines = parseFloat(values.msvehicle_engines);
	        var crew = parseFloat(values.msvehicle_crew);
	        var cockpit = parseFloat(values.msvehicle_cockpit);
	        var cargo = parseFloat(values.msvehicle_cargo);
	        var airlock = parseFloat(values.msvehicle_airlock);
	        
	        var engines_tr = parseInt(values.msvehicle_engines_tr);
	        var maneuvering_tr = parseInt(values.msvehicle_maneuvering_tr);
	        
	        var total_modules = weapons + tractor_beam + storage + sickbay + sensors + self_repair + robot_arms + rescue_utilities + passengers + open_space + maneuvering + lab + hyperspace + hanger + environment + extra_sensors + escape_pod + engines + crew + cockpit + cargo + airlock;
	        
	        var speed_tr = Math.ceil((engines*engines_tr)/total_modules);
	        var handling_tr = Math.ceil((maneuvering*maneuvering_tr)/total_modules);
	        
	        
	        var cargo_ts = 0;
	        var cargo_te = 0;
	        var cockpit_ts = 0;
	        var cockpit_te = 0;
	        var crew_ts = 0;
	        var crew_te = 0;
	        var engines_ts = 0;
	        var engines_te = 0;
	        var escape_pod_ts = 0;
	        var escape_pod_te = 0;
	        var extra_sensors_ts = 0;
	        var extra_sensors_te = 0;
	        var hanger_ts = 0;
	        var hanger_te = 0;
	        var hyperspace_ts = 0;
	        var hyperspace_te = 0;
	        var lab_ts = 0;
	        var lab_te = 0;
	        var maneuvering_ts = 0;
	        var maneuvering_te = 0;
	        var open_space_ts = 0;
	        var open_space_te = 0;
	        var passengers_ts = 0;
	        var passengers_te = 0;
	        var robot_arms_ts = 0;
	        var robot_arms_te = 0;
	        var self_repair_ts = 0;
	        var self_repair_te = 0;
	        var sickbay_ts = 0;
	        var sickbay_te = 0;
	        var storage_ts = 0;
	        var storage_te = 0;
	        var tractor_beam_ts = 0;
	        var tractor_beam_te = 0;
	        var weapons_ts = 0;
	        var weapons_te = 0;
	        if (values.msvehicle_type == "spaceship") {
	            var pct_values = {};
	            
    	        pct_values['weapons'] = (weapons/total_modules)*100;
    	        if (pct_values['weapons'] < 1 && pct_values['weapons'] > 0) {
    	            pct_values['weapons'] = 1;
    	        } else {
    	            pct_values['weapons'] = Math.round(pct_values['weapons']);
    	        }
    	        pct_values['tractor_beam'] = (tractor_beam/total_modules)*100;
    	        if (pct_values['tractor_beam'] < 1 && pct_values['tractor_beam'] > 0) {
    	            pct_values['tractor_beam'] = 1;
    	        } else {
    	            pct_values['tractor_beam'] = Math.round(pct_values['tractor_beam']);
    	        }
    	        pct_values['storage'] = (storage/total_modules)*100;
    	        if (pct_values['storage'] < 1 && pct_values['storage'] > 0) {
    	            pct_values['storage'] = 1;
    	        } else {
    	            pct_values['storage'] = Math.round(pct_values['storage']);
    	        }
    	        pct_values['sickbay'] = (sickbay/total_modules)*100;
    	        if (pct_values['sickbay'] < 1 && pct_values['sickbay'] > 0) {
    	            pct_values['sickbay'] = 1;
    	        } else {
    	            pct_values['sickbay'] = Math.round(pct_values['sickbay']);
    	        }
    	        pct_values['self_repair'] = (self_repair/total_modules)*100;
    	        if (pct_values['self_repair'] < 1 && pct_values['self_repair'] > 0) {
    	            pct_values['self_repair'] = 1;
    	        } else {
    	            pct_values['self_repair'] = Math.round(pct_values['self_repair']);
    	        }
    	        pct_values['robot_arms'] = (robot_arms/total_modules)*100;
    	        if (pct_values['robot_arms'] < 1 && pct_values['robot_arms'] > 0) {
    	            pct_values['robot_arms'] = 1;
    	        } else {
    	            pct_values['robot_arms'] = Math.round(pct_values['robot_arms']);
    	        }
    	        pct_values['passengers'] = (passengers/total_modules)*100;
    	        if (pct_values['passengers'] < 1 && pct_values['passengers'] > 0) {
    	            pct_values['passengers'] = 1;
    	        } else {
    	            pct_values['passengers'] = Math.round(pct_values['passengers']);
    	        }
    	        pct_values['open_space'] = (open_space/total_modules)*100;
    	        if (pct_values['open_space'] < 1 && pct_values['open_space'] > 0) {
    	            pct_values['open_space'] = 1;
    	        } else {
    	            pct_values['open_space'] = Math.round(pct_values['open_space']);
    	        }
    	        pct_values['maneuvering'] = (maneuvering/total_modules)*100;
    	        if (pct_values['maneuvering'] < 1 && pct_values['maneuvering'] > 0) {
    	            pct_values['maneuvering'] = 1;
    	        } else {
    	            pct_values['maneuvering'] = Math.round(pct_values['maneuvering']);
    	        }
    	        pct_values['lab'] = (lab/total_modules)*100;
    	        if (pct_values['lab'] < 1 && pct_values['lab'] > 0) {
    	            pct_values['lab'] = 1;
    	        } else {
    	            pct_values['lab'] = Math.round(pct_values['lab']);
    	        }
    	        pct_values['hyperspace'] = (hyperspace/total_modules)*100;
    	        if (pct_values['hyperspace'] < 1 && pct_values['hyperspace'] > 0) {
    	            pct_values['hyperspace'] = 1;
    	        } else {
    	            pct_values['hyperspace'] = Math.round(pct_values['hyperspace']);
    	        }
    	        pct_values['hanger'] = (hanger/total_modules)*100;
    	        if (pct_values['hanger'] < 1 && pct_values['hanger'] > 0) {
    	            pct_values['hanger'] = 1;
    	        } else {
    	            pct_values['hanger'] = Math.round(pct_values['hanger']);
    	        }
    	        pct_values['extra_sensors'] = (extra_sensors/total_modules)*100;
    	        if (pct_values['extra_sensors'] < 1 && pct_values['extra_sensors'] > 0) {
    	            pct_values['extra_sensors'] = 1;
    	        } else {
    	            pct_values['extra_sensors'] = Math.round(pct_values['extra_sensors']);
    	        }
    	        pct_values['escape_pod'] = (escape_pod/total_modules)*100;
    	        if (pct_values['escape_pod'] < 1 && pct_values['escape_pod'] > 0) {
    	            pct_values['escape_pod'] = 1;
    	        } else {
    	            pct_values['escape_pod'] = Math.round(pct_values['escape_pod']);
    	        }
    	        pct_values['engines'] = (engines/total_modules)*100;
    	        if (pct_values['engines'] < 1 && pct_values['engines'] > 0) {
    	            pct_values['engines'] = 1;
    	        } else {
    	            pct_values['engines'] = Math.round(pct_values['engines']);
    	        }
    	        pct_values['crew'] = (crew/total_modules)*100;
    	        if (pct_values['crew'] < 1 && pct_values['crew'] > 0) {
    	            pct_values['crew'] = 1;
    	        } else {
    	            pct_values['crew'] = Math.round(pct_values['crew']);
    	        }
    	        pct_values['cockpit'] = (cockpit/total_modules)*100;
    	        if (pct_values['cockpit'] < 1 && pct_values['cockpit'] > 0) {
    	            pct_values['cockpit'] = 1;
    	        } else {
    	            pct_values['cockpit'] = Math.round(pct_values['cockpit']);
    	        }
    	        pct_values['cargo'] = (cargo/total_modules)*100;
    	        if (pct_values['cargo'] < 1 && pct_values['cargo'] > 0) {
    	            pct_values['cargo'] = 1;
    	        } else {
    	            pct_values['cargo'] = Math.round(pct_values['cargo']);
    	        }
    	        
    	        
    	        
    	        var total_pct = pct_values['cargo'] + pct_values['cockpit'] + pct_values['crew'] + pct_values['engines'] + pct_values['escape_pod'] + pct_values['extra_sensors'] + pct_values['hanger'] + pct_values['hyperspace'] + pct_values['lab'] + pct_values['maneuvering'] + pct_values['open_space'] + pct_values['passengers'] + pct_values['self_repair'] + pct_values['robot_arms'] + pct_values['sickbay'] + pct_values['storage'] + pct_values['tractor_beam'] + pct_values['weapons'];
    	        var pct_diff = total_pct - 100;
    	        if (pct_diff < 0) {
    	            while (pct_diff != 0) {
        	            for (var key in pct_values) {
                            if (pct_values[key] != 0) {
        	                    pct_values[key] = pct_values[key] + 1;
        	                    pct_diff = pct_diff + 1;
                            }
                            
                            if (pct_diff === 0) {
                                break;
                            }
        	            }
    	            }
    	        }
    	        
    	        if (pct_diff > 0) {
    	            while (pct_diff != 0) {
    	                for (var key in pct_values) {
                            if (pct_values[key] != 0 && pct_values[key] != 1) {
    	                        pct_values[key] = pct_values[key] - 1;
    	                        pct_diff = pct_diff - 1;
                            }
                        
                            if (pct_diff === 0) {
                                break;
                            }
    	                }
    	            }
    	        }
    	        
    	        var last_value = 0;
    	        
    	        if (pct_values['cargo'] != 0) {
    	            cargo_ts = last_value + 1;
    	            cargo_te = last_value + pct_values['cargo'];
    	            last_value = cargo_te;
    	        }
    	        if (pct_values['cockpit'] != 0) {
    	            cockpit_ts = last_value + 1;
    	            cockpit_te = last_value + pct_values['cockpit'];
    	            last_value = cockpit_te;
    	        }
    	        if (pct_values['crew'] != 0) {
    	            crew_ts = last_value + 1;
    	            crew_te = last_value + pct_values['crew'];
    	            last_value = crew_te;
    	        }
    	        if (pct_values['engines'] != 0) {
    	            engines_ts = last_value + 1;
    	            engines_te = last_value + pct_values['engines'];
    	            last_value = engines_te;
    	        }
    	        if (pct_values['escape_pod'] != 0) {
    	            escape_pod_ts = last_value + 1;
    	            escape_pod_te = last_value + pct_values['escape_pod'];
    	            last_value = escape_pod_te;
    	        }
    	        if (pct_values['extra_sensors'] != 0) {
    	            extra_sensors_ts = last_value + 1;
    	            extra_sensors_te = last_value + pct_values['extra_sensors'];
    	            last_value = extra_sensors_te;
    	        }
    	        if (pct_values['hanger'] != 0) {
    	            hanger_ts = last_value + 1;
    	            hanger_te = last_value + pct_values['hanger'];
    	            last_value = hanger_te;
    	        }
    	        if (pct_values['hyperspace'] != 0) {
    	            hyperspace_ts = last_value + 1;
    	            hyperspace_te = last_value + pct_values['hyperspace'];
    	            last_value = hyperspace_te;
    	        }
    	        if (pct_values['lab'] != 0) {
    	            lab_ts = last_value + 1;
    	            lab_te = last_value + pct_values['lab'];
    	            last_value = lab_te;
    	        }
    	        if (pct_values['maneuvering'] != 0) {
    	            maneuvering_ts = last_value + 1;
    	            maneuvering_te = last_value + pct_values['maneuvering'];
    	            last_value = maneuvering_te;
    	        }
    	        if (pct_values['open_space'] != 0) {
    	            open_space_ts = last_value + 1;
    	            open_space_te = last_value + pct_values['open_space'];
    	            last_value = open_space_te;
    	        }
    	        if (pct_values['passengers'] != 0) {
    	            passengers_ts = last_value + 1;
    	            passengers_te = last_value + pct_values['passengers'];
    	            last_value = passengers_te;
    	        }
    	        if (pct_values['robot_arms'] != 0) {
    	            robot_arms_ts = last_value + 1;
    	            robot_arms_te = last_value + pct_values['robot_arms'];
    	            last_value = robot_arms_te;
    	        }
    	        if (pct_values['self_repair'] != 0) {
    	            self_repair_ts = last_value + 1;
    	            self_repair_te = last_value + pct_values['self_repair'];
    	            last_value = self_repair_te;
    	        }
    	        if (pct_values['sickbay'] != 0) {
    	            sickbay_ts = last_value + 1;
    	            sickbay_te = last_value + pct_values['sickbay'];
    	            last_value = sickbay_te;
    	        }
    	        if (pct_values['storage'] != 0) {
    	            storage_ts = last_value + 1;
    	            storage_te = last_value + pct_values['storage'];
    	            last_value = storage_te;
    	        }
    	        if (pct_values['tractor_beam'] != 0) {
    	            tractor_beam_ts = last_value + 1;
    	            tractor_beam_te = last_value + pct_values['tractor_beam'];
    	            last_value = tractor_beam_te;
    	        }
    	        if (pct_values["weapons"] != 0) {
    	            weapons_ts = last_value + 1;
    	            weapons_te = last_value + pct_values["weapons"];
    	            last_value = weapons_te;
    	        }
	        }
	        
	        
	        var sails = 0;
	        var lift_gas = 0;
	        var visual_size = 0;
	        var sails_toggle = 0;
	        var gas_bag_toggle = 0;
	        
	        if (values.msvehicle_type == "spaceship") {
	            var msvehicle_spaceship_toggle= 1;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = total_modules;
	        } else if (values.msvehicle_type == "regular") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = (total_modules + Math.ceil(total_modules * .1)) * 10;
	        } else if (values.msvehicle_type == "terrain") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size_mod = Math.ceil(total_modules * .2);
	            if (size_mod < 2) {
	                var size = (total_modules + 2) * 10;
	            } else {
	                var size = (total_modules + size_mod) * 10;
	            }
	        } else if (values.msvehicle_type == "walker") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = total_modules * 2 * 10;
	        } else if (values.msvehicle_type == "burrower") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = Math.ceil(speed_tr * .1);
	            var handling = Math.ceil(handling_tr * .1);
	            var size = total_modules * 3 * 10;
	        } else if (values.msvehicle_type == "motor") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = Math.ceil(speed_tr * .5);
	            var handling = Math.ceil(handling_tr * .5);
	            var size = total_modules * 2 * 10;
	        } else if (values.msvehicle_type == "sail") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = Math.ceil(speed_tr * .5);
	            var handling = Math.ceil(handling_tr * .5);
	            var size = total_modules * 2 * 10;
	            visual_size = size * 2;
	            sails_toggle = 1;
	        } else if (values.msvehicle_type == "sub") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = Math.ceil(speed_tr * .5);
	            var handling = Math.ceil(handling_tr * .5);
	            var size = total_modules * 3 * 10;
	        } else if (values.msvehicle_type == "wings") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = total_modules * 3 * 10;
	        } else if (values.msvehicle_type == "anti-grav") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = (total_modules + Math.ceil(total_modules * .1)) * 10;
	        } else if (values.msvehicle_type == "rotor_blades") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = total_modules * 2 * 10;
	        } else if (values.msvehicle_type == "hover_craft") {
	            var msvehicle_spaceship_toggle = 0
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = total_modules * 2 * 10;
	        } else if (values.msvehicle_type == "gas_bag") {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            lift_gas = (total_modules / 10) * 1000;
	            total_modules = total_modules + lift_gas;
	            var size = total_modules;
	            gas_bag_toggle = 1;
	        } else {
	            var msvehicle_spaceship_toggle = 0;
	            var speed = speed_tr;
	            var handling = handling_tr;
	            var size = total_modules;
	        }
	        
	        size_rating = Math.floor(Math.log2(size)) + 1;
	        
	        setAttrs({
	            msvehicle_sails_toggle: sails_toggle,
	            msvehicle_gas_bag_toggle: gas_bag_toggle,
	            msvehicle_speed: speed,
	            msvehicle_handling: handling,
	            msvehicle_total_modules: total_modules,
	            msvehicle_spaceship_toggle: msvehicle_spaceship_toggle,
	            msvehicle_size: size,
	            msvehicle_lift_gas: lift_gas,
	            msvehicle_visual_size_sails_up: visual_size,
	            msvehicle_size_rating: size_rating,
	            msvehicle_weapons_table_start: weapons_ts,
	            msvehicle_weapons_table_end: weapons_te,
	            msvehicle_tractor_beam_table_start: tractor_beam_ts,
	            msvehicle_tractor_beam_table_end: tractor_beam_te,
	            msvehicle_storage_table_start: storage_ts,
	            msvehicle_storage_table_end: storage_te,
	            msvehicle_sickbay_table_start: sickbay_ts,
	            msvehicle_sickbay_table_end: sickbay_te,
	            msmsvehicle_self_repair_table_start: self_repair_ts,
	            msvehicle_self_repair_table_end: self_repair_te,
	            msvehicle_robot_arm_table_start: robot_arms_ts,
	            msvehicle_robot_arm_table_end: robot_arms_te,
	            msvehicle_passengers_table_start: passengers_ts,
	            msvehicle_passengers_table_end: passengers_te,
	            msmsvehicle_open_space_table_start: open_space_ts,
	            msvehicle_open_space_table_end: open_space_te,
	            msvehicle_maneuvering_table_start: maneuvering_ts,
	            msmsvehicle_maneuvering_table_end: maneuvering_te,
	            msvehicle_lab_table_start: lab_ts,
	            msvehicle_lab_table_end: lab_te,
	            msvehicle_hyperdrive_table_start: hyperspace_ts,
	            msvehicle_hyperdrive_table_end: hyperspace_te,
	            msvehicle_hanger_table_start: hanger_ts,
	            msvehicle_hanger_table_end: hanger_te,
	            msvehicle_extra_sensors_table_start: extra_sensors_ts,
	            msvehicle_extra_sensors_table_end: extra_sensors_te,
	            msvehicle_escape_pod_table_start: escape_pod_ts,
	            msvehicle_escape_pod_table_end: escape_pod_te,
	            msvehicle_engines_table_start: engines_ts,
	            msmsvehicle_engines_table_end: engines_te,
	            msvehicle_crew_table_start: crew_ts,
	            msvehicle_crew_table_end: crew_te,
	            msvehicle_cargo_table_start: cargo_ts,
	            msvehicle_cargo_table_end: cargo_te,
	            msvehicle_cockpit_table_start: cockpit_ts,
	            msvehicle_cockpit_table_end: cockpit_te
	        });
	    }); 
	});
	
	//Ship Condition
	on("change:ship_condition", function() {
	    getAttrs(["ship_condition", "ship_seaworthiness"], function(values) {
	        var ship_range = Math.ceil(values.ship_seaworthiness/10);
	        
	        if (values.ship_condition == "ship_shape") {
				setAttrs({
					ship_condition_skills: '1',
					ship_speed: '-',
					ship_condition_range: 0,
					ship_repair_mod: '-',
				});
			} else if (values.ship_condition == "seaworthy") {
				setAttrs({
					ship_condition_skills: '1',
					ship_speed: '-',
					ship_condition_range: parseFloat(ship_range * .25),
					ship_repair_mod: 'x1',
				});
			} else if (values.ship_condition == "battered") {
				setAttrs({
					ship_condition_skills: '2',
					ship_speed: '-25%',
					ship_condition_range: parseFloat(ship_range * .5),
					ship_repair_mod: 'x2',
				});
			} else if (values.ship_condition == "swamped") {
				setAttrs({
					ship_condition_skills: '3',
					ship_speed: '-50%',
					ship_condition_range: parseFloat(ship_range * .75),
					ship_repair_mod: 'x3',
				});
			} else if (values.ship_condition == "sinking") {
				setAttrs({
					ship_condition_skills: '4',
					ship_speed: '-100%',
					ship_condition_range: parseFloat(ship_range),
					ship_repair_mod: 'x4',
				});
			}  else {
				setAttrs({
					ship_condition_skills: '1',
					ship_speed: '-',
					ship_condition_range: 0,
					ship_repair_mod: '-',
				});
			}  
		});
	});

    // Fatigue
	on("change:fatigue change:healing_rate", function() {
		getAttrs(["fatigue", "healing_rate"], function(values) {
			var healing_rate = parseInt(values.healing_rate);
			if (values.fatigue == "9") {
				setAttrs({
					fatigue_skills: '0',
					movement_rate_fatigue: '+0',
					//initiative_bonus_fatigue: 0,
					//action_points_fatigue: '+0',
					fatigue_recovery: 0,
				});
			} else if (values.fatigue == "8") {
				setAttrs({
					fatigue_skills: '1',
					movement_rate_fatigue: '+0',
					//initiative_bonus_fatigue: 0,
					//action_points_fatigue: '+0',
					fatigue_recovery: .25 / healing_rate,
				});
			} else if (values.fatigue == "7") {
				setAttrs({
					fatigue_skills: '1',
					movement_rate_fatigue: '-1',
					//initiative_bonus_fatigue: 0,
					//action_points_fatigue: '+0',
					fatigue_recovery: 3 / healing_rate,
				});
			} else if (values.fatigue == "6") {
				setAttrs({
					fatigue_skills: '2',
					movement_rate_fatigue: '-2',
					//initiative_bonus_fatigue: -2,
					//action_points_fatigue: '+0',
					fatigue_recovery: 6 / healing_rate,
				});
			} else if (values.fatigue == "5") {
				setAttrs({
					fatigue_skills: '2',
					movement_rate_fatigue: '*.5',
					//initiative_bonus_fatigue: -4,
					//action_points_fatigue: '-1',
					fatigue_recovery: 12 / healing_rate,
				});
			} else if (values.fatigue == "4") {
				setAttrs({
					fatigue_skills: '3',
					movement_rate_fatigue: '*.5',
					//initiative_bonus_fatigue: -6,
					//action_points_fatigue: '-2',
					fatigue_recovery: 18  / healing_rate,
				});
			} else if (values.fatigue == "3") {
				setAttrs({
					fatigue_skills: '3',
					movement_rate_fatigue: '*0',
					//initiative_bonus_fatigue: -8,
					//action_points_fatigue: '-3',
					fatigue_recovery: 24 / healing_rate,
				});
			} else if (values.fatigue == "2") {
				setAttrs({
					fatigue_skills: '4',
					movement_rate_fatigue: '*0',
					//initiative_bonus_fatigue: -99,
					//action_points_fatigue: '*0',
					fatigue_recovery: 36 / healing_rate,
				});
			} else if (values.fatigue == "1") {
				setAttrs({
					fatigue_skills: '5',
					movement_rate_fatigue: '*0',
					//initiative_bonus_fatigue: -99,
					//action_points_fatigue: '*0',
					fatigue_recovery: 48 / healing_rate,
				});
			} else if (values.fatigue == "0") {
				setAttrs({
					fatigue_skills: '5',
					movement_rate_fatigue: '*0',
					//initiative_bonus_fatigue: -99,
					//action_points_fatigue: '*0',
					fatigue_recovery: "-"
				});
			} else {
				setAttrs({
					fatigue_skills: '0',
					movement_rate_fatigue: '+0',
					//initiative_bonus_fatigue: 0,
					//action_points_fatigue: '+0',
					fatigue_recovery: 0,
				});
			} 
		});
	});
	
	// Encumbrance
	on("change:avg_species_siz change:str change:effective_armor_enc change:shields_enc change:melee_weapons_enc change:missile_weapons_enc change:firearms_enc change:loadout_enc change:pack_enc change:pack_equipped change:currency_enc change:encumbrance_temp", function() {
	    getAttrs(["avg_species_siz", "str", "effective_armor_enc", "shields_enc", "melee_weapons_enc", "missile_weapons_enc", "firearms_enc", "loadout_enc", "pack_enc", "pack_equipped", "currency_enc", "encumbrance_temp"], function(v) {
	        var str = parseInt(v.str);
	        var burdened = str * 2;
	        var overloaded = str * 3;
	        var enc_max = str * 4;
	        var enc = (parseFloat(v.effective_armor_enc) + parseFloat(v.shields_enc) + parseFloat(v.melee_weapons_enc) + parseFloat(v.missile_weapons_enc) + parseFloat(v.firearms_enc) + parseFloat(v.loadout_enc) + (parseFloat(v.pack_enc) * parseFloat(v.pack_equipped)) + parseFloat(v.currency_enc) + parseFloat(v.encumbrance_temp)) * (parseInt(v.avg_species_siz) / 13);
	        var maxTranslation = getTranslationByKey('max-u');
	        var impossibleTranslation = getTranslationByKey('impossible-u');
	        var strenuousTranslation = getTranslationByKey('strenuous-u');
	        var mediumTranslation = getTranslationByKey('medium-u');
	        var normalTranslation = getTranslationByKey('normal-u');
	        var halvedTranslation = getTranslationByKey('halved-u');
	        if (enc > enc_max) {
	            setAttrs({
	                encumbrance_load: maxTranslation,
	                encumbrance_skills: "3",
	                encumbrance_move: impossibleTranslation,
	                burdened_enc: burdened,
	                overloaded_enc: overloaded,
	                encumbrance_current_max: enc_max,
	                movement_rate_enc: "*0",
	            });
	        } else if (enc > overloaded) {
	            setAttrs({
	                encumbrance_load: strenuousTranslation,
	                encumbrance_skills: "2",
	                encumbrance_move: halvedTranslation,
	                burdened_enc: burdened,
	                overloaded_enc: overloaded,
	                encumbrance_current_max: enc_max,
	                movement_rate_enc: "*.5",
	            });
	        } else if (enc > burdened) {
	            setAttrs({
	                encumbrance_load: mediumTranslation,
	                encumbrance_skills: "1",
	                encumbrance_move: "-2",
	                burdened_enc: burdened,
	                overloaded_enc: overloaded,
	                encumbrance_current_max: enc_max,
	                movement_rate_enc: "-2",
	            });
	        } else {
	            setAttrs({
	                encumbrance_load: normalTranslation,
	                encumbrance_skills: "0",
	                encumbrance_move: normalTranslation,
	                burdened_enc: burdened,
	                overloaded_enc: overloaded,
	                encumbrance_current_max: enc_max,
	                movement_rate_enc: "+0",
	            });
	        }
	    }); 
	});
	
	// Armor ENC
	on("change:location11_armor_equipped change:location11_armor_enc change:location10_armor_equipped change:location10_armor_enc change:half_effective_armor_enc change:location9_armor_equipped change:location9_armor_enc change:location8_armor_equipped change:location_armor_enc change:location7_armor_equipped change:location7_armor_enc change:location6_armor_equipped change:location6_armor_enc change:location5_armor_equipped change:location5_armor_enc change:location4_armor_equipped change:location4_armor_enc change:location3_armor_equipped change:location3_armor_enc change:location2_armor_equipped change:location2_armor_enc change:location1_armor_equipped change:location1_armor_enc", function() {
	    getAttrs(["location11_armor_equipped", "location11_armor_enc", "location10_armor_equipped", "location10_armor_enc", "half_effective_armor_enc", "location9_armor_equipped", "location9_armor_enc", "location8_armor_equipped", "location8_armor_enc", "location7_armor_equipped", "location7_armor_enc", "location6_armor_equipped", "location6_armor_enc", "location5_armor_equipped", "location5_armor_enc", "location4_armor_equipped", "location4_armor_enc", "location3_armor_equipped", "location3_armor_enc", "location2_armor_equipped", "location2_armor_enc", "location1_armor_equipped", "location1_armor_enc"], function(v) {
	        var total_armor_enc = 0;
	        if (v.location11_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location11_armor_enc);
	        }
	        if (v.location10_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location10_armor_enc);
	        }
	        if (v.location9_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location9_armor_enc);
	        }
	        if (v.location8_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location8_armor_enc);
	        }
	        if (v.location7_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location7_armor_enc);
	        }
	        if (v.location6_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location6_armor_enc);
	        }
	        if (v.location5_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location5_armor_enc);
	        }
	        if (v.location4_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location4_armor_enc);
	        }
	        if (v.location3_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location3_armor_enc);
	        }
	        if (v.location2_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location2_armor_enc);
	        }
	        if (v.location1_armor_equipped == '1') {
	            total_armor_enc = total_armor_enc + parseFloat(v.location1_armor_enc);
	        }
	        if (v.half_effective_armor_enc == '1') {
	            armor_enc_multiplier = .25;
	        } else {
	            armor_enc_multiplier = .5;
	        }
	        setAttrs({
	            armor_enc: total_armor_enc,
	            effective_armor_enc: total_armor_enc * armor_enc_multiplier,
	            armor_penalty: 0-Math.ceil(total_armor_enc / 5)
	        });
	    });    
	});
	
	// Shields ENC
    on("change:repeating_shield remove:repeating_shield", function() {
        var total_shields_enc = 0;
        getSectionIDs("repeating_shield", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_shield_" + currentID + "_enc"], function(v) {
                        if(v["repeating_shield_" + currentID + "_enc"] && isNaN(parseFloat(v["repeating_shield_" + currentID + "_enc"])) === false) {
                            total_shields_enc = total_shields_enc + parseFloat(v["repeating_shield_" + currentID + "_enc"]);
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({shields_enc: total_shields_enc});
                        }
                    });
                });
            }
            else {
                setAttrs({shields_enc: total_shields_enc});
            }
        });
    });
	
	// Melee Weapons ENC
    on("change:repeating_meleeweapon remove:repeating_meleeweapon", function() {
        var total_melee_weapons_enc = 0;
        getSectionIDs("repeating_meleeweapon", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_meleeweapon_" + currentID + "_enc"], function(v) {
                        if(v["repeating_meleeweapon_" + currentID + "_enc"] && isNaN(parseFloat(v["repeating_meleeweapon_" + currentID + "_enc"])) === false) {
                            total_melee_weapons_enc = total_melee_weapons_enc + parseFloat(v["repeating_meleeweapon_" + currentID + "_enc"]);
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({melee_weapons_enc: total_melee_weapons_enc});
                        }
                    });
                });
            }
            else {
                setAttrs({melee_weapons_enc: total_melee_weapons_enc});
            }
        });
    });
	
	// Missile Weapons ENC
    on("change:repeating_missileweapon remove:repeating_missileweapon", function() {
        var total_missile_weapons_enc = 0;
        getSectionIDs("repeating_missileweapon", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_missileweapon_" + currentID + "_enc"], function(v) {
                        if(v["repeating_missileweapon_" + currentID + "_enc"] && isNaN(parseFloat(v["repeating_missileweapon_" + currentID + "_enc"])) === false) {
                            total_missile_weapons_enc = total_missile_weapons_enc + parseFloat(v["repeating_missileweapon_" + currentID + "_enc"]);
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({missile_weapons_enc: total_missile_weapons_enc});
                        }
                    });
                });
            }
            else {
                setAttrs({missile_weapons_enc: total_missile_weapons_enc});
            }
        });
    });
	
	// Firearms ENC
    on("change:repeating_firearm remove:repeating_firearm", function() {
        var total_firearm_enc = 0;
        getSectionIDs("repeating_firearm", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_firearm_" + currentID + "_enc"], function(v) {
                        if(v["repeating_firearm_" + currentID + "_enc"] && isNaN(parseFloat(v["repeating_firearm_" + currentID + "_enc"])) === false) {
                            total_firearm_enc = total_firearm_enc + parseFloat(v["repeating_firearm_" + currentID + "_enc"]);
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({firearms_enc: total_firearm_enc});
                        }
                    });
                });
            }
            else {
                setAttrs({firearms_enc: total_firearm_enc});
            }
        });
    });
	
    // Equipment ENC
    on("change:repeating_equipment remove:repeating_equipment", function() {
        var total_loadout_enc = 0;
        var total_pack_enc = 0;
        getSectionIDs("repeating_equipment", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_equipment_" + currentID + "_enc", "repeating_equipment_" + currentID + "_location", "repeating_equipment_" + currentID + "_quantity"], function(v) {
                        if(v["repeating_equipment_" + currentID + "_enc"] && isNaN(parseFloat(v["repeating_equipment_" + currentID + "_enc"])) === false) {
                            count = v["repeating_equipment_" + currentID + "_quantity"] && isNaN(parseFloat(v["repeating_equipment_" + currentID + "_quantity"])) === false ? parseFloat(v["repeating_equipment_" + currentID + "_quantity"]) : 1;
                            if(v["repeating_equipment_" + currentID + "_location"] == "loadout") {
                                total_loadout_enc = total_loadout_enc + (parseFloat(v["repeating_equipment_" + currentID + "_enc"]) * count);
                            }
                            if(v["repeating_equipment_" + currentID + "_location"] == "pack") {
                                total_pack_enc = total_pack_enc + (parseFloat(v["repeating_equipment_" + currentID + "_enc"]) * count);
                            }
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({
                                loadout_enc: total_loadout_enc,
                                pack_enc: total_pack_enc,
                            });
                        }
                    });
                });
            }
            else {
                setAttrs({
                    loadout_enc: total_loadout_enc,
                    pack_enc: total_pack_enc,
                });
            }
        });
    });
    
    // Currency ENC
    on("change:repeating_currency remove:repeating_currency", function() {
        var total_currency_enc = 0;
        getSectionIDs("repeating_currency", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_currency_" + currentID + "_enc", "repeating_currency_" + currentID + "_quantity"], function(v) {
                        if(v["repeating_currency_" + currentID + "_enc"] && isNaN(parseFloat(v["repeating_currency_" + currentID + "_enc"])) === false) {
                            count = v["repeating_currency_" + currentID + "_quantity"] && isNaN(parseFloat(v["repeating_currency_" + currentID + "_quantity"])) === false ? parseFloat(v["repeating_currency_" + currentID + "_quantity"]) : 1;
                            total_currency_enc = total_currency_enc + (parseFloat(v["repeating_currency_" + currentID + "_enc"]) * count);
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({currency_enc: total_currency_enc});
                        }
                    });
                });
            }
            else {
                setAttrs({currency_enc: total_currency_enc});
            }
        });
    });
	
	// Fetish Spirit Damage
    on("change:repeating_fetish:fetish_spectral_combat", function() {
		getAttrs(["repeating_fetish_fetish_spectral_combat"], function(values) {
		    var spectral_combat = parseInt(values.repeating_fetish_fetish_spectral_combat);
			var spirit_damage_table_value = Math.ceil(spectral_combat/20);
			
			var spirit_damage_result = '0';
			if (spirit_damage_table_value == 1) {
			     spirit_damage_result = '1d2';
		    } else if (spirit_damage_table_value == 2) {
			    spirit_damage_result = '1d4';
		    } else if (spirit_damage_table_value == 3) {
			    spirit_damage_result = '1d6';
		    } else if (spirit_damage_table_value == 4) {
			    spirit_damage_result = '1d8';
		    } else if (spirit_damage_table_value == 5) {
			    spirit_damage_result = '1d10';
		    } else if (spirit_damage_table_value == 6) {
			    spirit_damage_result = '2d6';
		    } else if (spirit_damage_table_value == 7) {
			    spirit_damage_result = '1d8+1d6';
		    } else if (spirit_damage_table_value == 8) {
			    spirit_damage_result = '2d8';
		    } else if (spirit_damage_table_value == 9) {
			    spirit_damage_result = '1d10+1d8';
		    } else if (spirit_damage_table_value == 10) {
			    spirit_damage_result = '2d10';
		    } else if (spirit_damage_table_value == 11) {
			    spirit_damage_result = '2d10+1d2';
		    } else if (spirit_damage_table_value == 12) {
			    spirit_damage_result = '2d10+1d4';
		    } else if (spirit_damage_table_value == 13) {
			    spirit_damage_result = '2d10+1d6';
		    } else if (spirit_damage_table_value == 14) {
			    spirit_damage_result = '2d10+1d8';
		    } else if (spirit_damage_table_value == 15) {
			    spirit_damage_result = '3d10';
		    } else {
		        spirit_damage_result = '0';
		    }
			
			setAttrs({
				repeating_fetish_fetish_spirit_damage: spirit_damage_result,
			});
		});
	});
	
	// Battle Unit Damage
    on("change:unit_frontage", function() {
		getAttrs(["unit_frontage"], function(values) {
		    var frontage = parseInt(values.unit_frontage);
			var unit_damage_table_value = Math.ceil(frontage/15);
			
			var unit_damage_result = '0';
			if (unit_damage_table_value == 1) {
			     unit_damage_result = '1d2';
		    } else if (unit_damage_table_value == 2) {
			    unit_damage_result = '1d4';
		    } else if (unit_damage_table_value == 3) {
			    unit_damage_result = '1d6';
		    } else if (unit_damage_table_value == 4) {
			    unit_damage_result = '1d8';
		    } else if (unit_damage_table_value == 5) {
			    unit_damage_result = '1d10';
		    } else if (unit_damage_table_value == 6) {
			    unit_damage_result = '2d6';
		    } else if (unit_damage_table_value == 7) {
			    unit_damage_result = '1d8+1d6';
		    } else if (unit_damage_table_value == 8) {
			    unit_damage_result = '2d8';
		    } else if (unit_damage_table_value == 9) {
			    unit_damage_result = '1d10+1d8';
		    } else if (unit_damage_table_value == 10) {
			    unit_damage_result = '2d10';
		    } else if (unit_damage_table_value == 11) {
			    unit_damage_result = '2d10+1d2';
		    } else if (unit_damage_table_value == 12) {
			    unit_damage_result = '2d10+1d4';
		    } else if (unit_damage_table_value == 13) {
			    unit_damage_result = '2d10+1d6';
		    } else if (unit_damage_table_value == 14) {
			    unit_damage_result = '2d10+1d8';
		    } else if (unit_damage_table_value == 15) {
			    unit_damage_result = '3d10';
		    } else {
		        unit_damage_result = '0';
		    }
			
			setAttrs({
				unit_damage: unit_damage_result,
			});
		});
	});
	
	// Arcane Magic Cost Reduction
	on("change:arcane_caster_class change:arcane_magic_rank change:int", function() {
	    getAttrs(["arcane_caster_class", "arcane_magic_rank", "int"], function(values) {
	        var magic_rank = parseInt(values.arcane_magic_rank);
	        var int = parseInt(values.int);
	        var reductionmod = 0;
	        var basememorizemax = 0;
	        var memorizemod = 0;
	        if (values.arcane_caster_class == "magic-user") {
	            reductionmod = 2;
	            memorizemod = 2;
	            basememorizemax = Math.ceil(int/4);
	        } else if (values.arcane_caster_class == "bard") {
	            reductionmod = 1;
	            memorizemod = 1;
	            basememorizemax = Math.ceil(int/6);
	        } else {
	            console.log("Invalid arcane caster class")
	        }
	        
	        var rank1reduction = 0;
	        var rank2reduction = 0;
	        var rank3reduction = 0;
	        var rank4reduction = 0;
	        var rank5reduction = 0;
	        
	        var rank1memmax = 0;
	        var rank2memmax = 0;
	        var rank3memmax = 0;
	        var rank4memmax = 0;
	        var rank5memmax = 0;
	        
	        if (magic_rank > 5) {
	            rank5reduction = -((magic_rank - 5) * reductionmod);
	            rank5memmax = basememorizemax + ((magic_rank - 5) * memorizemod);
	        } else if (magic_rank == 5) {
	            rank5memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 4) {
	            rank4reduction = -((magic_rank - 4) * reductionmod);
	            rank4memmax = basememorizemax + ((magic_rank - 4) * memorizemod);
	        } else if (magic_rank == 4) {
	            rank4memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 3) {
	            rank3reduction = -((magic_rank - 3) * reductionmod);
	            rank3memmax = basememorizemax + ((magic_rank - 3) * memorizemod);
	        } else if (magic_rank == 3) {
	            rank3memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 2) {
	            rank2reduction = -((magic_rank - 2) * reductionmod);
	            rank2memmax = basememorizemax + ((magic_rank - 2) * memorizemod);
	        } else if (magic_rank == 2) {
	            rank2memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 1) {
	            rank1reduction = -((magic_rank - 1) * reductionmod);
	            rank1memmax = basememorizemax + ((magic_rank - 1) * memorizemod);
	        } else if (magic_rank == 1) {
	            rank1memmax = basememorizemax;
	        }
	        
	        setAttrs({
				arcane_rank_1_cost_reduction: rank1reduction,
				arcane_rank_2_cost_reduction: rank2reduction,
				arcane_rank_3_cost_reduction: rank3reduction,
				arcane_rank_4_cost_reduction: rank4reduction,
				arcane_rank_5_cost_reduction: rank5reduction,
				arcane_rank_1_memorized_max: rank1memmax,
				arcane_rank_2_memorized_max: rank2memmax,
				arcane_rank_3_memorized_max: rank3memmax,
				arcane_rank_4_memorized_max: rank4memmax,
				arcane_rank_5_memorized_max: rank5memmax,
			});
	    });
	});
	
	// Divine Magic Cost Reduction
	on("change:divine_caster_class change:divine_magic_rank change:int", function() {
	    getAttrs(["divine_caster_class", "divine_magic_rank", "int"], function(values) {
	        var magic_rank = parseInt(values.divine_magic_rank);
	        var int = parseInt(values.int);
	        var reductionmod = 0;
	        var basememorizemax = 0;
	        var memorizemod = 0;
	        if ( (values.divine_caster_class == "cleric") || (values.divine_caster_class == "druid")) {
	            reductionmod = 2;
	            memorizemod = 2;
	            basememorizemax = Math.ceil(int/4);
	        } else if (values.divine_caster_class == "bard") {
	            reductionmod = 1;
	            memorizemod = 1;
	            basememorizemax = Math.ceil(int/6);
	        } else if ((values.divine_caster_class == "paladin") || (values.divine_caster_class == "ranger")) {
	            reductionmod = 1;
	            memorizemod = 1;
	            basememorizemax = Math.ceil(int/6);
	            magic_rank = magic_rank - 2;
	        } else {
	            console.log("Invalid divine caster class")
	        }
	        
	        var rank1reduction = 0;
	        var rank2reduction = 0;
	        var rank3reduction = 0;
	        var rank4reduction = 0;
	        var rank5reduction = 0;
	        
	        var rank1memmax = 0;
	        var rank2memmax = 0;
	        var rank3memmax = 0;
	        var rank4memmax = 0;
	        var rank5memmax = 0;
	        
	        if (magic_rank > 5) {
	            rank5reduction = -((magic_rank - 5) * reductionmod);
	            rank5memmax = basememorizemax + ((magic_rank - 5) * memorizemod);
	        } else if (magic_rank == 5) {
	            rank5memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 4) {
	            rank4reduction = -((magic_rank - 4) * reductionmod);
	            rank4memmax = basememorizemax + ((magic_rank - 4) * memorizemod);
	        } else if (magic_rank == 4) {
	            rank4memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 3) {
	            rank3reduction = -((magic_rank - 3) * reductionmod);
	            rank3memmax = basememorizemax + ((magic_rank - 3) * memorizemod);
	        } else if (magic_rank == 3) {
	            rank3memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 2) {
	            rank2reduction = -((magic_rank - 2) * reductionmod);
	            rank2memmax = basememorizemax + ((magic_rank - 2) * memorizemod);
	        } else if (magic_rank == 2) {
	            rank2memmax = basememorizemax;
	        }
	        
	        if (magic_rank > 1) {
	            rank1reduction = -((magic_rank - 1) * reductionmod);
	            rank1memmax = basememorizemax + ((magic_rank - 1) * memorizemod);
	        } else if (magic_rank == 1) {
	            rank1memmax = basememorizemax;
	        }
	        
	        setAttrs({
				divine_rank_1_cost_reduction: rank1reduction,
				divine_rank_2_cost_reduction: rank2reduction,
				divine_rank_3_cost_reduction: rank3reduction,
				divine_rank_4_cost_reduction: rank4reduction,
				divine_rank_5_cost_reduction: rank5reduction,
				divine_rank_1_memorized_max: rank1memmax,
				divine_rank_2_memorized_max: rank2memmax,
				divine_rank_3_memorized_max: rank3memmax,
				divine_rank_4_memorized_max: rank4memmax,
				divine_rank_5_memorized_max: rank5memmax,
			});
	    });
	});
	
	// Count Known Cantrips for Arcane Magic
    on("change:repeating_arcanemagicrank0spell remove:repeating_arcanemagicrank0spell", function() {
        var total_cantrips_known = 0;
        getSectionIDs("repeating_arcanemagicrank0spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    total_cantrips_known = total_cantrips_known + 1;
                    if(i === idarray.length - 1) {
                        setAttrs({arcane_rank_0_known: total_cantrips_known});
                    }
                });
            }
            else {
                setAttrs({arcane_rank_0_known: total_cantrips_known});
            }
        });
    });
                    
    // Count Memorized Rank 1 Arcane Spells
    on("change:repeating_arcanemagicrank1spell remove:repeating_arcanemagicrank1spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_arcanemagicrank1spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_arcanemagicrank1spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_arcanemagicrank1spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_arcanemagicrank1spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({arcane_rank_1_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({arcane_rank_1_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 2 Arcane Spells
    on("change:repeating_arcanemagicrank2spell remove:repeating_arcanemagicrank2spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_arcanemagicrank2spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_arcanemagicrank2spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_arcanemagicrank2spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_arcanemagicrank2spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({arcane_rank_2_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({arcane_rank_2_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 3 Arcane Spells
    on("change:repeating_arcanemagicrank3spell remove:repeating_arcanemagicrank3spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_arcanemagicrank3spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_arcanemagicrank3spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_arcanemagicrank3spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_arcanemagicrank3spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({arcane_rank_3_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({arcane_rank_3_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 4 Arcane Spells
    on("change:repeating_arcanemagicrank4spell remove:repeating_arcanemagicrank4spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_arcanemagicrank4spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_arcanemagicrank4spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_arcanemagicrank4spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_arcanemagicrank4spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({arcane_rank_4_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({arcane_rank_4_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 5 Arcane Spells
    on("change:repeating_arcanemagicrank5spell remove:repeating_arcanemagicrank5spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_arcanemagicrank5spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_arcanemagicrank5spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_arcanemagicrank5spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_arcanemagicrank5spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({arcane_rank_5_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({arcane_rank_5_memorized: total_memorized});
            }
        });
    });
	
	// Count Memorized Rank 1 Divine Spells
    on("change:repeating_divinemagicrank1spell remove:repeating_divinemagicrank1spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_divinemagicrank1spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_divinemagicrank1spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_divinemagicrank1spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_divinemagicrank1spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({divine_rank_1_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({divine_rank_1_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 2 Divine Spells
    on("change:repeating_divinemagicrank2spell remove:repeating_divinemagicrank2spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_divinemagicrank2spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_divinemagicrank2spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_divinemagicrank2spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_divinemagicrank2spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({divine_rank_2_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({divine_rank_2_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 3 Divine Spells
    on("change:repeating_divinemagicrank3spell remove:repeating_divinemagicrank3spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_divinemagicrank3spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_divinemagicrank3spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_divinemagicrank3spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_divinemagicrank3spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({divine_rank_3_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({divine_rank_3_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 4 Divine Spells
    on("change:repeating_divinemagicrank4spell remove:repeating_divinemagicrank4spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_divinemagicrank4spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_divinemagicrank4spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_divinemagicrank4spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_divinemagicrank4spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({divine_rank_4_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({divine_rank_4_memorized: total_memorized});
            }
        });
    });
    
    // Count Memorized Rank 5 Divine Spells
    on("change:repeating_divinemagicrank5spell remove:repeating_divinemagicrank5spell", function() {
        var total_memorized = 0;
        getSectionIDs("repeating_divinemagicrank5spell", function(idarray) {
            if(idarray.length > 0) {
                _.each(idarray, function(currentID, i) {
                    getAttrs(["repeating_divinemagicrank5spell_" + currentID + "_memorized"], function(v) {
                        if( ( v["repeating_divinemagicrank5spell_" + currentID + "_memorized"] == 1 ) && isNaN(parseInt(v["repeating_divinemagicrank5spell_" + currentID + "_memorized"])) === false) {
                            total_memorized = total_memorized + 1;
                        }
                        if(i === idarray.length - 1) {
                            setAttrs({divine_rank_5_memorized: total_memorized});
                        }
                    });
                });
            }
            else {
                setAttrs({divine_rank_5_memorized: total_memorized});
            }
        });
    });
    
    // Swap chars for spirit attrs
    on("change:spirit", function() {
        getAttrs(["spirit"], function(v) {
            if (v.spirit == 1) {
                setAttrs({initiative_bonus_chars: "(@{int}+@{cha})"});
            } else {
                setAttrs({initiative_bonus_chars: "(@{int}+@{dex})"});
            }
        });
    });
    
    // JSON Import
	on("change:encounter_generator_json", function() {
	    getAttrs(["encounter_generator_json", "simplified_combat_enabled"], function(values) {
	        var simplified_combat_enabled = parseInt(values.simplified_combat_enabled);
	        var jsonData = JSON.parse(values.encounter_generator_json);
	        var characterData = jsonData[0];
	        
	        // Import Info
	        var rank = 0;
	        setAttrs({character_name: characterData["name"]});

	        if (typeof characterData["cults"][0] !== []) {
    	        if (typeof characterData["cults"][0] !== 'undefined') { 
    	            var cults = "";
    	            for (var i=0; i < characterData["cults"].length; i++) {
    	                cults = cults + " * " + characterData["cults"][i] + "\r\n";
    	            }
    	            setAttrs({cults_notes: cults});
    	        }
	        }
	        if (typeof characterData["cult_rank"] !== 'undefined') {
	            if (characterData["cult_rank"].toLowerCase() == "common" || characterData["cult_rank"].toLowerCase() == "lay member" || characterData["cult_rank"].toLowerCase() == "follower") {
	                rank = 1;
	            } else if (characterData["cult_rank"].toLowerCase() == "dedicated" || characterData["cult_rank"].toLowerCase().toLowerCase() == "initiate" || characterData["cult_rank"].toLowerCase() == "spirit worshipper") {
	                rank = 2;
	            } else if (characterData["cult_rank"].toLowerCase() == "proven" || characterData["cult_rank"].toLowerCase() == "acolyte" || characterData["cult_rank"].toLowerCase() == "shaman") {
	                rank = 3;
	            } else if (characterData["cult_rank"].toLowerCase() == "overseer" || characterData["cult_rank"].toLowerCase() == "priest" || characterData["cult_rank"].toLowerCase() == "high shaman") {
	                rank = 4;
	            } else if (characterData["cult_rank"].toLowerCase() == "leader" || characterData["cult_rank"].toLowerCase() == "high priest" || characterData["cult_rank"].toLowerCase() == "spirit lord") {
	                rank = 5;
	            } else {
	                rank = 0;
	            }
	            setAttrs({rank: rank});
	            
	            if (rank == 2) {
	                setAttrs({cult_spirit_limit: "ceil(@{cha}*.5)"});
	            } else if (rank == 3) {
	                setAttrs({cult_spirit_limit: "ceil(@{cha}*.75)"});
	            } else if (rank == 4) {
	                setAttrs({cult_spirit_limit: "@{cha}"});
	            } else if (rank == 5) {
	                setAttrs({cult_spirit_limit: "@{cha}+0"});
	            } else {
	                setAttrs({cult_spirit_limit: "ceil(@{cha}*.25)"});
	            }
	        }
	        if (typeof characterData["notes"] !== 'undefined') {
	            setAttrs({notes: characterData["notes"]});
	        }

	        // Import Stats
	        var str = 0;
	        var dex = 0;
	        var con = 0;
	        var siz = 0;
	        var int = 0;
	        var pow = 0;
	        var cha = 0;
	        for (var i=0; i < characterData["stats"].length; i++) {
	            var stat = characterData["stats"][i]
	            var statKey = Object.keys(stat)[0];
	            var statValue = stat[statKey];
                
                if ( statKey == "STR" ) {
                    str = statValue;
                }
                if ( statKey == "DEX" ) {
                    dex = statValue;
                }
                if ( statKey == "CON" ) {
                    con = statValue;
                }
                if ( statKey == "SIZ" ) {
                    siz = statValue;
                }
                if ( statKey == "INT" ) {
                    int = statValue;
                    setAttrs({int_type: "int-u"});
                }
                if ( statKey == "INS" ) {
                    int = statValue;
                    setAttrs({int_type: "ins-u"});
                }
                if ( statKey == "POW" ) {
                    pow = statValue;
                }
                if ( statKey == "CHA" ) {
                    cha = statValue;
                }
	        }
	        
	        setAttrs({
	            str_base: str,
	            dex_base: dex,
	            con_base: con,
	            siz_base: siz,
	            int_base: int,
	            pow_base: pow,
	            cha_base: cha
	        })
	        
	        if (str == 0 && dex == 0 && con == 0 && siz == 0) {
	            setAttrs({spirit: 1});
	        }

	        // Import Attributes
	        if (typeof characterData["attributes"]["movement"] !== 'undefined') {
	            setAttrs({movement_rate_species: characterData["attributes"]["movement"]});
	        }
	        if (typeof characterData["attributes"]["action_points"] !== 'undefined') {
	            setAttrs({action_points: characterData["attributes"]["action_points"]});
	        }
	        if (typeof characterData["attributes"]["magic_points"] !== 'undefined') {
	            setAttrs({magic_points: characterData["attributes"]["magic_points"]});
	        }
	        if (typeof characterData["attributes"]["prana_points"] !== 'undefined') {
	            setAttrs({prana_points: characterData["attributes"]["prana_points"]});
	        }
	        if (typeof characterData["attributes"]["power_points"] !== 'undefined') {
	            setAttrs({power_points: characterData["attributes"]["power_points"]});
	        }
	        if (typeof characterData["attributes"]["tenacity"] !== 'undefined') {
	            setAttrs({tenacity: characterData["attributes"]["tenacity"]});
	        }
	        if (typeof characterData["attributes"]["strike_rank"] !== 'undefined') {
	            if (characterData["attributes"]["strike_rank"].includes("-")) {
	                var strike_rank_other = characterData["attributes"]["strike_rank"].split("-")[1].replace(')','');
	                
	                setAttrs({initiative_bonus_other: 0 - strike_rank_other});
	            }
	        }
	        if (typeof characterData["attributes"]["initiative"] !== 'undefined') {
	            if (characterData["attributes"]["initiative"].includes("-")) {
	                var strike_rank_other = characterData["attributes"]["initiative"].split("-")[1].replace(')','');
	                
	                setAttrs({initiative_bonus_other: 0 - strike_rank_other});
	            }
	        }
	        if (typeof characterData["attributes"]["initiative_bonus"] !== 'undefined') {
	            if (characterData["attributes"]["initiative_bonus"].includes("-")) {
	                var strike_rank_other = characterData["attributes"]["initiative_bonus"].split("-")[1].replace(')','');
	                
	                setAttrs({initiative_bonus_other: 0 - strike_rank_other});
	            }
	        }

	        // Import Traits
	        if (typeof characterData["features"] !== 'undefined') {
	            var traitattrs = {};
	            for (var i=0; i < characterData["features"].length; i++) {
	                var traitid = generateRowID();
                    traitattrs["repeating_trait_" + traitid + "_trait"] = characterData["features"][i];
	            }
	            setAttrs(traitattrs);
	        }

	        // Import Hit Locations
	        if (simplified_combat_enabled === 1) {
	            if (typeof characterData["hit_locations"][0]["ap"] !== 'undefined') {
	                setAttrs({location1_armor_ap: characterData["hit_locations"][0]["ap"]});
	            }
	            setAttrs({simplified_hp: Math.ceil((con+siz)/2)});
	        } else {
	            var base_hp = Math.ceil((con+siz)/5);
	            
	            if (typeof characterData["hit_locations"][0] !== 'undefined') {
	                var table = characterData["hit_locations"][0]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location1_table_start: table[0],
	                    location1_table_end: table[1],
	                    location1_name: characterData["hit_locations"][0]["name"],
	                    location1_armor_ap: characterData["hit_locations"][0]["ap"],
	                    location1_hp_max_base_mod: characterData["hit_locations"][0]["hp"] - base_hp, location1_hp: characterData["hit_locations"][0]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location1_table_start: "0",
	                    location1_table_end: "0",
	                    location1_name: " ",
	                    location1_armor_ap: "0",
	                    location1_hp_max_base_mod: 0 - base_hp, location1_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][1] !== 'undefined') {
	                var table = characterData["hit_locations"][1]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location2_table_start: table[0],
	                    location2_table_end: table[1],
	                    location2_name: characterData["hit_locations"][1]["name"],
	                    location2_armor_ap: characterData["hit_locations"][1]["ap"],
	                    location2_hp_max_base_mod: characterData["hit_locations"][1]["hp"] - base_hp, location2_hp: characterData["hit_locations"][1]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location2_table_start: "0",
	                    location2_table_end: "0",
	                    location2_name: " ",
	                    location2_armor_ap: "0",
	                    location2_hp_max_base_mod: 0 - base_hp, location2_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][2] !== 'undefined') {
	                var table = characterData["hit_locations"][2]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location3_table_start: table[0],
	                    location3_table_end: table[1],
	                    location3_name: characterData["hit_locations"][2]["name"],
	                    location3_armor_ap: characterData["hit_locations"][2]["ap"],
	                    location3_hp_max_base_mod: characterData["hit_locations"][2]["hp"] - base_hp, location3_hp: characterData["hit_locations"][2]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location3_table_start: "0",
	                    location3_table_end: "0",
	                    location3_name: " ",
	                    location3_armor_ap: "0",
	                    location3_hp_max_base_mod: 0 - base_hp, location3_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][3] !== 'undefined') {
	                var table = characterData["hit_locations"][3]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location4_table_start: table[0],
	                    location4_table_end: table[1],
	                    location4_name: characterData["hit_locations"][3]["name"],
	                    location4_armor_ap: characterData["hit_locations"][3]["ap"],
	                    location4_hp_max_base_mod: characterData["hit_locations"][3]["hp"] - base_hp, location4_hp: characterData["hit_locations"][3]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location4_table_start: "0",
	                    location4_table_end: "0",
	                    location4_name: " ",
	                    location4_armor_ap: "0",
	                    location4_hp_max_base_mod: 0 - base_hp, location4_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][4] !== 'undefined') {
	                var table = characterData["hit_locations"][4]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location5_table_start: table[0],
	                    location5_table_end: table[1],
	                    location5_name: characterData["hit_locations"][4]["name"],
	                    location5_armor_ap: characterData["hit_locations"][4]["ap"],
	                    location5_hp_max_base_mod: characterData["hit_locations"][4]["hp"] - base_hp, location5_hp: characterData["hit_locations"][4]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location5_table_start: "0",
	                    location5_table_end: "0",
	                    location5_name: " ",
	                    location5_armor_ap: "0",
	                    location5_hp_max_base_mod: 0 - base_hp, location5_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][5] !== 'undefined') {
	                var table = characterData["hit_locations"][5]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location6_table_start: table[0],
	                    location6_table_end: table[1],
	                    location6_name: characterData["hit_locations"][5]["name"],
	                    location6_armor_ap: characterData["hit_locations"][5]["ap"],
	                    location6_hp_max_base_mod: characterData["hit_locations"][5]["hp"] - base_hp, location6_hp: characterData["hit_locations"][5]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location6_table_start: "0",
	                    location6_table_end: "0",
	                    location6_name: " ",
	                    location6_armor_ap: "0",
	                    location6_hp_max_base_mod: 0 - base_hp, location6_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][6] !== 'undefined') {
	                var table = characterData["hit_locations"][6]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location7_table_start: table[0],
	                    location7_table_end: table[1],
	                    location7_name: characterData["hit_locations"][6]["name"],
	                    location7_armor_ap: characterData["hit_locations"][6]["ap"],
	                    location7_hp_max_base_mod: characterData["hit_locations"][6]["hp"] - base_hp, location7_hp: characterData["hit_locations"][6]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location7_table_start: "0",
	                    location7_table_end: "0",
	                    location7_name: " ",
	                    location7_armor_ap: "0",
	                    location7_hp_max_base_mod: 0 - base_hp, location7_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][7] !== 'undefined') {
	                var table = characterData["hit_locations"][7]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location8_table_start: table[0],
	                    location8_table_end: table[1],
	                    location8_name: characterData["hit_locations"][7]["name"],
	                    location8_armor_ap: characterData["hit_locations"][7]["ap"],
	                    location8_hp_max_base_mod: characterData["hit_locations"][7]["hp"] - base_hp, location8_hp: characterData["hit_locations"][7]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location8_table_start: "0",
	                    location8_table_end: "0",
	                    location8_name: " ",
	                    location8_armor_ap: "0",
	                    location8_hp_max_base_mod: 0 - base_hp, location8_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][8] !== 'undefined') {
	                var table = characterData["hit_locations"][8]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location9_table_start: table[0],
	                    location9_table_end: table[1],
	                    location9_name: characterData["hit_locations"][8]["name"],
	                    location9_armor_ap: characterData["hit_locations"][8]["ap"],
	                    location9_hp_max_base_mod: characterData["hit_locations"][8]["hp"] - base_hp, location9_hp: characterData["hit_locations"][8]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location9_table_start: "0",
	                    location9_table_end: "0",
	                    location9_name: " ",
	                    location9_armor_ap: "0",
	                    location9_hp_max_base_mod: 0 - base_hp, location9_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][9] !== 'undefined') {
	                var table = characterData["hit_locations"][9]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location10_table_start: table[0],
	                    location10_table_end: table[1],
	                    location10_name: characterData["hit_locations"][9]["name"],
	                    location10_armor_ap: characterData["hit_locations"][9]["ap"],
	                    location10_hp_max_base_mod: characterData["hit_locations"][9]["hp"] - base_hp, location10_hp: characterData["hit_locations"][9]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location10_table_start: "0",
	                    location10_table_end: "0",
	                    location10_name: " ",
	                    location10_armor_ap: "0",
	                    location10_hp_max_base_mod: 0 - base_hp, location10_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][10] !== 'undefined') {
	                var table = characterData["hit_locations"][10]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location11_table_start: table[0],
	                    location11_table_end: table[1],
	                    location11_name: characterData["hit_locations"][10]["name"],
	                    location11_armor_ap: characterData["hit_locations"][10]["ap"],
	                    location11_hp_max_base_mod: characterData["hit_locations"][10]["hp"] - base_hp, location11_hp: characterData["hit_locations"][10]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location11_table_start: "0",
	                    location11_table_end: "0",
	                    location11_name: " ",
	                    location11_armor_ap: "0",
	                    location11_hp_max_base_mod: 0 - base_hp, location11_hp: "0",
	                });
	            }
	            
	            if (typeof characterData["hit_locations"][11] !== 'undefined') {
	                var table = characterData["hit_locations"][11]["range"].split("-");
	                table[0] = parseInt(table[0]);
	                if (!table[1]) {
                        table[1] = table[0];
                    } else {
                        table[1] = parseInt(table[1]);
                    }
	                setAttrs({
	                    location12_table_start: table[0],
	                    location12_table_end: table[1],
	                    location12_name: characterData["hit_locations"][11]["name"],
	                    location12_armor_ap: characterData["hit_locations"][11]["ap"],
	                    location12_hp_max_base_mod: characterData["hit_locations"][11]["hp"] - base_hp, location12_hp: characterData["hit_locations"][11]["hp"]
	                });
	            } else {
	                setAttrs({
	                    location12_table_start: "0",
	                    location12_table_end: "0",
	                    location12_name: " ",
	                    location12_armor_ap: "0",
	                    location12_hp_max_base_mod: 0 - base_hp, location12_hp: "0",
	                });
	            }
	        }

	        //Default weapon displays off
	        var displayweapons = {};
	        displayweapons["display_shields"] = 0;
	        displayweapons["display_melee_weapons"] = 0;
	        displayweapons["display_missile_weapons"] = 0;
	        displayweapons["display_firearms"] = 0;

	        // Import Combat Styles & Weapons
	        if (typeof characterData["combat_styles"] !== 'undefined') {
	            for (var i=0; i < characterData["combat_styles"].length; i++) {
	                var combat_style = characterData["combat_styles"][i];
	                var combatstyleid = generateRowID();
                    var combatstyleattrs = {};
                    var base_combatstyle = str + dex;
                    combatstyleattrs["repeating_combatstyle_" + combatstyleid + "_name"] = combat_style["name"];
                    combatstyleattrs["repeating_combatstyle_" + combatstyleid + "_experience"] = combat_style["value"] - base_combatstyle;
                    combatstyleattrs["repeating_combatstyle_" + combatstyleid + "_details"] = 0;
                    setAttrs(combatstyleattrs);
                    for (var j=0; j < combat_style["weapons"].length; j++) {
                        var weapon = combat_style["weapons"][j];
                        var weaponid = generateRowID();
                        var weaponattrs = {};

                        if (weapon["type"] == "ranged") {
                            displayweapons["display_missile_weapons"] = 1;
                            weaponattrs["repeating_missileweapon_" + weaponid + "_name"] = weapon["name"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_force"] = weapon["size"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_impale_size"] = weapon["size"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_range"] = weapon["range"];
                            if (weapon["add_damage_modifier"] == true) {
                                weaponattrs["repeating_missileweapon_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                            } else {
                                weaponattrs["repeating_missileweapon_" + weaponid + "_damage_mod_toggle"] = 0;
                            }
                            weaponattrs["repeating_missileweapon_" + weaponid + "_damage"] = weapon["damage"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_ap"] = weapon["ap"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_hp"] = weapon["hp"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_notes"] = weapon["effects"];
                            weaponattrs["repeating_missileweapon_" + weaponid + "_details"] = 0;
                        } else if (weapon["type"] == "shield") {
                            displayweapons["display_shields"] = 1;
                            weaponattrs["repeating_shield_" + weaponid + "_name"] = weapon["name"];
                            weaponattrs["repeating_shield_" + weaponid + "_size"] = weapon["size"];
                            weaponattrs["repeating_shield_" + weaponid + "_reach"] = weapon["reach"];
                            if (weapon["add_damage_modifier"] == true) {
                                weaponattrs["repeating_shield_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                            } else {
                                weaponattrs["repeating_shield_" + weaponid + "_damage_mod_toggle"] = 0;
                            }
                            weaponattrs["repeating_shield_" + weaponid + "_damage"] = weapon["damage"];
                            weaponattrs["repeating_shield_" + weaponid + "_ap"] = weapon["ap"];
                            weaponattrs["repeating_shield_" + weaponid + "_hp"] = weapon["hp"];
                            weaponattrs["repeating_shield_" + weaponid + "_notes"] = weapon["effects"];
                            weaponattrs["repeating_shield_" + weaponid + "_details"] = 0;
                        } else {
                            displayweapons["display_melee_weapons"] = 1;
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_name"] = weapon["name"];
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_size"] = weapon["size"];
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_reach"] = weapon["reach"];
                            if (weapon["add_damage_modifier"] == true) {
                                weaponattrs["repeating_meleeweapon_" + weaponid + "_damage_mod_toggle"] = "@{damage_mod}";
                            } else {
                                weaponattrs["repeating_meleeweapon_" + weaponid + "_damage_mod_toggle"] = 0;
                            }
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_damage"] = weapon["damage"];
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_ap"] = weapon["ap"];
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_hp"] = weapon["hp"];
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_notes"] = weapon["effects"];
                            weaponattrs["repeating_meleeweapon_" + weaponid + "_details"] = 0;
                        }
                        setAttrs(weaponattrs);
                    }
	            }
	        }
	        
	        //Set Weapon Display
	        setAttrs(displayweapons);

	        // Default to show no magic
	        var displaymagic = {};
	        displaymagic["display_theism"] = 0;
	        displaymagic["display_sorcery"] = 0;
	        displaymagic["display_mysticism"] = 0;
	        displaymagic["display_animism"] = 0;
	        displaymagic["display_folk_magic"] = 0;
	        displaymagic["display_arcane_magic"] = 0;
	        displaymagic["display_divine_magic"] = 0;
	        displaymagic["display_roman_magic"] = 0;
	        displaymagic["display_fae_powers"] = 0;

	        // Import Skills
	        if (typeof characterData["skills"] !== 'undefined') {
	            for (var i=0; i < characterData["skills"].length; i++) {
	                var skill = characterData["skills"][i];
	                var skillid = generateRowID();
	                var skillattrs = {};
	                var skillKey = Object.keys(skill)[0];
	                var skillValue = skill[skillKey];
	                
	                if (skillKey.toLowerCase() == "spectral combat") {
	                    skillattrs["repeating_combatstyle_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_combatstyle_" + skillid + "_char1"] = "@{pow}";
	                    skillattrs["repeating_combatstyle_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_combatstyle_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_combatstyle_" + skillid + "_encumbered"] = 0;
	                    skillattrs["repeating_combatstyle_" + skillid + "_details"] = 0;
	                    skillattrs["binding_learned"] = "1";
	                    skillattrs["binding_experience"] = skillValue - pow - cha;
	                    displaymagic["display_animism"] = 1;
	                } else if (skillKey.toLowerCase() == "fata") {
	                    skillattrs["fata_learned"] = "@{fata_base}";
	                    skillattrs["fata_experience"] = skillValue - pow - cha;
	                    displaymagic["display_fae_powers"] = 1;
	                } else if (skillKey.toLowerCase() == "folk magic") {
	                    skillattrs["folk_magic_learned"] = "@{folk_magic_base}";
	                    skillattrs["folk_magic_experience"] = skillValue - pow - cha;
	                    displaymagic["display_folk_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "trance") {
	                    skillattrs["trance_learned"] = "@{trance_base}";
	                    skillattrs["trance_experience"] = skillValue - pow - con;
	                    displaymagic["display_animism"] = 1;
	                } else if (skillKey.toLowerCase() == "binding") {
	                    skillattrs["binding_learned"] = "1";
	                    skillattrs["binding_experience"] = skillValue - pow - cha;
	                    displaymagic["display_animism"] = 1;
	                } else if (skillKey.toLowerCase() == "meditation") {
	                    skillattrs["meditation_learned"] = "1";
	                    skillattrs["meditation_experience"] = skillValue - con - int;
	                    displaymagic["display_mysticism"] = 1;
	                } else if (skillKey.toLowerCase() == "mysticism") {
	                    skillattrs["repeating_path_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_path_" + skillid + "_experience"] = skillValue - con - pow;
	                    skillattrs["repeating_path_" + skillid + "_details"] = 0;
	                    displaymagic["display_mysticism"] = 1;
	                } else if (skillKey.toLowerCase() == "invocation") {
	                    skillattrs["repeating_invocation_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_invocation_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_invocation_" + skillid + "_details"] = 0;
	                    displaymagic["display_sorcery"] = 1;
	                } else if (skillKey.toLowerCase() == "shaping") {
	                    skillattrs["shaping_learned"] = "1";
	                    skillattrs["shaping_experience"] = skillValue - int - pow;
	                    displaymagic["display_sorcery"] = 1;
	                } else if (skillKey.toLowerCase() == "arcane knowledge") {
	                    skillattrs["arcane_knowledge_experience"] = skillValue - int - int;
	                    skillattrs["arcane_knowledge_learned"] = 1;
	                    displaymagic["display_arcane_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "arcane casting") {
	                    skillattrs["arcane_casting_experience"] = skillValue - int - pow;
	                    skillattrs["arcane_casting_learned"] = 1;
	                    displaymagic["display_arcane_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "devotion") {
	                    skillattrs["repeating_devotion_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_devotion_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_devotion_" + skillid + "_details"] = 0;
	                    displaymagic["display_theism"] = 1;
	                    if (rank == 2) {
	                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "ceil(@{pow}*.25)";
	                    } else if (rank == 3) {
	                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "ceil(@{pow}*.5)";
	                    } else if (rank == 4) {
	                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "ceil(@{pow}*.75)";
	                    } else if (rank == 5) {
	                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "@{pow}";
	                    } else {
	                        skillattrs["repeating_devotion_" + skillid + "_rank_devotion_pool_limit"] = "0";
	                    }
	                } else if (skillKey.toLowerCase() == "exhort") {
	                    skillattrs["exhort_learned"] = "@{exhort_base}";
	                    skillattrs["exhort_experience"] = skillValue - int - cha;
	                    displaymagic["display_theism"] = 1;
	                } else if (skillKey.toLowerCase() == "channel") {
	                    skillattrs["channel_experience"] = skillValue - int - pow;
	                    skillattrs["channel_learned"] = 1;
	                    displaymagic["display_divine_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "piety") {
	                    skillattrs["piety_experience"] = skillValue - cha - pow;
	                    skillattrs["piety_learned"] = 1;
	                    displaymagic["display_divine_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "cursing") {
	                    skillattrs["cursing_experience"] = skillValue - cha - pow;
	                    skillattrs["cursing_learned"] = 1;
	                    displaymagic["display_roman_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "divination") {
	                    skillattrs["divination_experience"] = skillValue - int - pow;
	                    skillattrs["divination_learned"] = 1;
	                    displaymagic["display_roman_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "necromancy") {
	                    skillattrs["necromancy_experience"] = skillValue - int - cha;
	                    skillattrs["necromancy_learned"] = 1;
	                    displaymagic["display_roman_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "pharmacy") {
	                    skillattrs["pharmacy_experience"] = skillValue - int - int;
	                    skillattrs["pharmacy_learned"] = 1;
	                    displaymagic["display_roman_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "shape shifting") {
	                    skillattrs["shape_shifting_experience"] = skillValue - con - pow;
	                    skillattrs["shape_shifting_learned"] = 1;
	                    displaymagic["display_roman_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "theology") {
	                    skillattrs["theology_experience"] = skillValue - pow - pow;
	                    skillattrs["theology_learned"] = 1;
	                    displaymagic["display_roman_magic"] = 1;
	                } else if (skillKey.toLowerCase() == "athletics") {
	                    skillattrs["athletics_experience"] = skillValue - str - dex;
	                } else if (skillKey.toLowerCase() == "boating") {
	                    skillattrs["boating_experience"] = skillValue - str - con;
	                } else if (skillKey.toLowerCase() == "brawn") {
	                    skillattrs["brawn_experience"] = skillValue - str - siz;
	                } else if (skillKey.toLowerCase() == "conceal") {
	                    skillattrs["conceal_experience"] = skillValue - dex - pow;
	                } else if (skillKey.toLowerCase() == "customs") {
	                    skillattrs["customs_experience"] = skillValue - int - int;
	                } else if (skillKey.toLowerCase() == "dance") {
	                    skillattrs["dance_experience"] = skillValue - cha - dex;
	                } else if (skillKey.toLowerCase() == "deceit") {
	                    skillattrs["deceit_experience"] = skillValue - int - cha;
	                } else if (skillKey.toLowerCase() == "drive") {
	                    skillattrs["drive_experience"] = skillValue - dex - pow;
	                } else if (skillKey.toLowerCase() == "endurance") {
	                    skillattrs["endurance_experience"] = skillValue - con - con;
	                } else if (skillKey.toLowerCase() == "evade") {
	                    skillattrs["evade_experience"] = skillValue - dex - dex;
	                } else if (skillKey.toLowerCase() == "first aid") {
	                    skillattrs["first_aid_experience"] = skillValue - int - dex;
	                } else if (skillKey.toLowerCase() == "home parallel") {
	                    skillattrs["home parallel_experience"] = skillValue - int - int;
	                } else if (skillKey.toLowerCase() == "influence") {
	                    skillattrs["influence_experience"] = skillValue - cha - cha;
	                } else if (skillKey.toLowerCase() == "insight") {
	                    skillattrs["insight_experience"] = skillValue - int - pow;
	                } else if (skillKey.toLowerCase() == "locale") {
	                    skillattrs["locale_experience"] = skillValue - int - int;
	                } else if (skillKey.toLowerCase() == "perception") {
	                    skillattrs["perception_experience"] = skillValue - int - pow;
	                } else if (skillKey.toLowerCase() == "ride") {
	                    skillattrs["ride_experience"] = skillValue - dex - pow;
	                } else if (skillKey.toLowerCase() == "sing") {
	                    skillattrs["sing_experience"] = skillValue - cha - pow;
	                } else if (skillKey.toLowerCase() == "status") {
	                    skillattrs["status_experience"] = skillValue;
	                } else if (skillKey.toLowerCase() == "stealth") {
	                    skillattrs["stealth_experience"] = skillValue - dex - int;
	                } else if (skillKey.toLowerCase() == "superstition") {
	                    skillattrs["superstition_experience"] = skillValue - ((21 - int) + pow);
	                } else if (skillKey.toLowerCase() == "swim") {
	                    skillattrs["swim_experience"] = skillValue - str - con;
	                } else if (skillKey.toLowerCase() == "unarmed") {
	                    skillattrs["unarmed_experience"] = skillValue - str - dex;
	                } else if (skillKey.toLowerCase() == "willpower") {
	                    skillattrs["willpower_experience"] = skillValue - pow - pow;
	                } else if (skillKey.toLowerCase() == "acting") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - cha - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "acrobatics") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - str - dex;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{str}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "astrogation") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "bureaucracy") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "command") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "commerce") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "comms") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "computers") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "courtesy") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "demolitions") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "disguise") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "electronics") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "engineering") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "forgery") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "gambling") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "healing") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "law") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "linguistics") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "lockpicking") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - dex;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "lycanthropy") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - con - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{con}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "mechanisms") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "medicine") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "navigation") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "oratory") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "pilot") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "probabilities") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "politics") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "research") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "rhetoric") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "seamanship") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - con;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{con}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "seduction") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "sensors") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - pow;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "sleight") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "streetwise") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "survival") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "teach") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase() == "track") {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - con;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{con}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("art") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - pow - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{pow}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("craft") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("culture") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("knowledge") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("language") !== -1) {
	                    skillattrs["repeating_language_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_language_" + skillid + "_experience"] = skillValue - int - cha;
	                    skillattrs["repeating_language_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("literacy") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("lore") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("musicianship") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - dex - cha;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{dex}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{cha}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 1;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("science") !== -1) {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue - int - int;
	                    skillattrs["repeating_professionalskill_" + skillid + "_char1"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_char2"] = "@{int}";
	                    skillattrs["repeating_professionalskill_" + skillid + "_skill_encumbered"] = 0;
	                    skillattrs["repeating_professionalskill_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("passion") !== -1) {
	                    skillattrs["repeating_passion_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_passion_" + skillid + "_score"] = skillValue;
	                    skillattrs["repeating_passion_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("dependency") !== -1) {
	                    skillattrs["repeating_dependency_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_dependency_" + skillid + "_score"] = skillValue;
	                    skillattrs["repeating_dependency_" + skillid + "_details"] = 0;
	                } else if (skillKey.toLowerCase().indexOf("affiliation") !== -1) {
	                    skillattrs["repeating_affiliation_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_affiliation_" + skillid + "_experience"] = skillValue - 40;
	                    skillattrs["repeating_affiliation_" + skillid + "_details"] = 0;
	                } else {
	                    skillattrs["repeating_professionalskill_" + skillid + "_name"] = skillKey;
	                    skillattrs["repeating_professionalskill_" + skillid + "_experience"] = skillValue;
	                }
	                
	                setAttrs(skillattrs);
	            }
	        }
	        
	        
            // Import Folk Magic Spells
            if (typeof characterData["folk_spells"] !== 'undefined') {
                var folk_spells = "";
                var spellattrs = {};
                for (var i=0; i < characterData["folk_spells"].length; i++) {
                    displaymagic["display_folk_magic"] = 1;
                    var folk_spell = characterData["folk_spells"][i];
	                var spellid = generateRowID();
	                
	                folk_spells = folk_spells + folk_spell + ", ";
	                spellattrs["repeating_folkspell_" + spellid + "_name"] = folk_spell;
	            }
                setAttrs(spellattrs);
            }

            // Import Mysticism Talents
            if (typeof characterData["mysticism_spells"] !== 'undefined') {
                var mysticism_spells = "";
                var talentattrs = {};
                for (var i=0; i < characterData["mysticism_spells"].length; i++) {
                    displaymagic["display_mysticism"] = 1;
	                var mysticism_spell = characterData["mysticism_spells"][i];
	                var talentid = generateRowID();
	                
	                mysticism_spells = mysticism_spells + mysticism_spell + ", ";
	                talentattrs["repeating_practicedtalent_" + talentid + "_name"] = mysticism_spell;
	            }
                setAttrs(talentattrs);
            }
            
            // Import Sorcery Spells
            if (typeof characterData["sorcery_spells"] !== 'undefined') {
                var sorcery_spells = "";
                var spellattrs = {};
                for (var i=0; i < characterData["sorcery_spells"].length; i++) {
                    displaymagic["display_sorcery"] = 1;
                    var sorcey_spell = characterData["sorcery_spells"][i];
                    var spellid = generateRowID();
                    
	                sorcery_spells = sorcery_spells + sorcey_spell + ", ";
	                spellattrs["repeating_sorceryspell_" + spellid + "_name"] = sorcey_spell;
	            }
                setAttrs(spellattrs);
            }

            // Import Theism Miracles
            if (typeof characterData["theism_spells"] !== 'undefined') {
                var theism_spells = "";
                var miracleattrs = {};
                for (var i=0; i < characterData["theism_spells"].length; i++) {
                    displaymagic["display_theism"] = 1;
                    var theism_spell = characterData["theism_spells"][i];
                    var miracleid = generateRowID();
                    
	                theism_spells = theism_spells + theism_spell + ", ";
	                miracleattrs["repeating_miracle_" + miracleid + "_name"] = theism_spell;
	            }
                setAttrs(miracleattrs);
            }

            //Import Spirits
	        if (typeof characterData["spirits"] !== 'undefined') {
	            for (var i=0; i < characterData["spirits"].length; i++) {
	                displaymagic["display_animism"] = 1;
	                var spirit = characterData["spirits"][i];
	                var spiritid = generateRowID();
	                var spiritattrs = {};
	                
	                // Set JSON string
	                spiritattrs["repeating_fetish_" + spiritid + "_fetish_json"] = JSON.stringify([spirit]);
	                
	                // Import spirit name
	                spiritattrs["repeating_fetish_" + spiritid + "_name"] = spirit["name"];
	                
	                // Hide details
	                spiritattrs["repeating_fetish_" + spiritid + "_details"] = 0;
	                
	                //Import spirit Stats
	                for (var j=0; j < spirit["stats"].length; j++) {
	                    var spiritstat = spirit["stats"][j];
	                    var spiritstatKey = Object.keys(spiritstat)[0];
	                    var spiritstatValue = spiritstat[spiritstatKey];
                
                        if ( spiritstatKey == "INT" ) {
                            spiritattrs["repeating_fetish_" + spiritid + "_int_type"] = spiritstatKey;
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_int"] = spiritstatValue;
                        }
                        if ( spiritstatKey == "INS" ) { 
                            spiritattrs["repeating_fetish_" + spiritid + "_int_type"] = spiritstatKey;
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_int"] = spiritstatValue;
                        }
                        if ( spiritstatKey == "POW" ) {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_pow"] = spiritstatValue;
                        }
                        if ( spiritstatKey == "CHA" ) {
                            spiritattrs["repeating_fetish_" + spiritid + "_fetish_cha"] = spiritstatValue;
                        }
	                }
	                
	                //Import spirit attributes
	                if (typeof spirit["attributes"]["magic_points"] !== 'undefined') {
	                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_magic_points"] = spirit["attributes"]["magic_points"];
	                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_tenacity"] = spirit["attributes"]["magic_points"];
	                }
	                if (typeof spirit["attributes"]["spirit_intensity"] !== 'undefined') {
	                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_intensity"] = spirit["attributes"]["spirit_intensity"];
	                }
	                
	                //Import spirit abilities
	                if (typeof spirit["features"] !== 'undefined') {
	                    var spiritabilities = "";
	                    for (var j=0; j < spirit["features"].length; j++) {
	                        spiritabilities = spiritabilities + " * " + spirit["features"][j] + "\r\n";
	                    }
	                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_spirit_abilities"] = spiritabilities;
	                }
	                
	                //Import spirit skills
	                if (typeof spirit["skills"] !== 'undefined') {
	                    var spirit_other_skills = "";
	                    for (var j=0; j < spirit["skills"].length; j++) {
	                        var spiritskill = spirit["skills"][j];
	                        var spiritskillKey = Object.keys(spiritskill)[0];
	                        var spiritskillValue = spiritskill[spiritskillKey];
	                        
                            if (spiritskillKey.toLowerCase() == "spectral combat") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_spectral_combat"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() == "willpower") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_willpower"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() == "folk magic") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_folk_magic"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() == "shaping") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_shaping"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() == "invocation") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_invocation"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() == "exhort") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_exhort"] = spiritskillValue;
                            } else  if (spiritskillKey.toLowerCase() == "devotion") {
                                spiritattrs["repeating_fetish_" + spiritid + "_fetish_devotion"] = spiritskillValue;
                            } else {
                                spirit_other_skills = spirit_other_skills + spiritskillKey + " " + spiritskillValue + "%, "
                            }
	                    }
	                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_other_skills"] = spirit_other_skills;
	                }
	                
	                //Import spirit spells
	                var spiritspells = "";
                    if (typeof spirit["folk_spells"] !== 'undefined') {
                        var spirit_folk_spells = "";
                        for (var j=0; j < spirit["folk_spells"].length; j++) {
	                        spirit_folk_spells = spirit_folk_spells + spirit["folk_spells"][j] + ", ";
	                    }
	                    if (spirit_folk_spells != "") {
                            spiritspells = spiritspells + "Folk Magic: " + spirit_folk_spells + "\r\n";
	                    }
                    }
            
                    if (typeof spirit["sorcery_spells"] !== 'undefined') {
                        var spirit_sorcery_spells = "";
                        for (var j=0; j < spirit["sorcery_spells"].length; j++) {
	                        spirit_sorcery_spells = spirit_sorcery_spells + spirit["sorcery_spells"][j] + ", ";
	                    }
	                    if (spirit_sorcery_spells != "") {
                            spiritspells = spiritspells + "Sorcery: " + spirit_sorcery_spells + "\r\n";
	                    }
                    }
            
                    if (typeof spirit["theism_spells"] !== 'undefined') {
                        var spirit_theism_spells = "";
                        for (var j=0; j < spirit["theism_spells"].length; j++) {
	                        spirit_theism_spells = spirit_theism_spells + spirit["theism_spells"][j] + ", ";
	                    }
	                    if (spirit_theism_spells != "") {
                            spiritspells = spiritspells + "Theism: " + spirit_theism_spells + "\r\n";
	                    }
                    }
                    spiritattrs["repeating_fetish_" + spiritid + "_fetish_powers"] = spiritspells;
	                
	                //Set spirit values
	                setAttrs(spiritattrs);
	            }
	        }

	        //Set magic displays
	        setAttrs(displaymagic);
	    });
	});
	
	//Check for sheet version updates
    on("sheet:opened", function() {
        console.log("Checking sheet versions")
        versioning();
        console.log("Setting campaign options")
        campaign_options();
    });
    
    //Set campaign options if any change
    on("change:setting_option change:vehicle_type_option change:extended_conflict_enabled_option change:simplified_combat_enabled_option change:luck_points_rank_option change:action_points_calc_option change:tenacity_enabled_option change:status_standard_option change:superstition_standard_option change:boating_standard_option change:linguistics_enabled_option change:dependencies_enabled_option change:firearms_enabled_option change:reach_enabled_option change:affiliations_enabled_option change:roman_magic_enabled_option change:arcane_magic_enabled_option change:divine_magic_enabled_option change:fae_powers_enabled_option change:folk_magic_enabled_option change:folk_magic_range_multiplier_option change:animism_enabled_option change:mysticism_enabled_option change:mythras_psionics_enabled_option change:ms_psionics_enabled_option change:sorcery_enabled_option change:theism_enabled_option change:max_devotional_pool_based_on_option", function() {
        console.log("Setting campaign options")
        campaign_options();
    });
