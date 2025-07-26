CREATE TABLE dbo.UserSystemMap (
    user_id INT NOT NULL,
    system_id INT NOT NULL,
    PRIMARY KEY (user_id, system_id)
    -- Optionally: FOREIGN KEY (user_id) REFERENCES dbo.Users(user_id),
    --             FOREIGN KEY (system_id) REFERENCES dbo.Systems(system_id)
);


INSERT INTO PatchManagementTracker.dbo.UserSystemMap (user_id,system_id) VALUES
	 (1004,1),
	 (1004,4),
	 (1004,7),
	 (1004,10),
	 (1004,13),
	 (1004,16),
	 (1004,19),
	 (1004,22),
	 (1004,25),
	 (1004,28);
INSERT INTO PatchManagementTracker.dbo.UserSystemMap (user_id,system_id) VALUES
	 (1004,31),
	 (1004,34),
	 (1004,37),
	 (1004,40),
	 (1004,43),
	 (1004,46),
	 (1004,49),
	 (1005,2),
	 (1005,5),
	 (1005,8);
INSERT INTO PatchManagementTracker.dbo.UserSystemMap (user_id,system_id) VALUES
	 (1005,11),
	 (1005,14),
	 (1005,17),
	 (1005,20),
	 (1005,23),
	 (1005,26),
	 (1005,29),
	 (1005,32),
	 (1005,35),
	 (1005,38);
INSERT INTO PatchManagementTracker.dbo.UserSystemMap (user_id,system_id) VALUES
	 (1005,41),
	 (1005,44),
	 (1005,47),
	 (1005,50),
	 (1006,3),
	 (1006,6),
	 (1006,9),
	 (1006,12),
	 (1006,15),
	 (1006,18);
INSERT INTO PatchManagementTracker.dbo.UserSystemMap (user_id,system_id) VALUES
	 (1006,21),
	 (1006,24),
	 (1006,27),
	 (1006,30),
	 (1006,33),
	 (1006,36),
	 (1006,39),
	 (1006,42),
	 (1006,45),
	 (1006,48);
