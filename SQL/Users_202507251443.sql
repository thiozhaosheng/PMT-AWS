CREATE TABLE dbo.Users (
    user_id INT IDENTITY(1000,1) PRIMARY KEY,
    username NVARCHAR(100) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL
);


INSERT INTO PatchManagementTracker.dbo.Users (username,password,[role]) VALUES
	 (N'admin1',N'$2b$10$d9offwG5.vK.yo8QFaRlPuvk/UPBcypvkjlrNondBQ8h.dnFIhw4O',N'admin'),
	 (N'pd-travis',N'$2b$10$l0pBGBT1Qc.l7w3EQHR1Wu8C3iU82HZCUBYX.2L3j5yDoVyOP3aQq',N'engineer'),
	 (N'pd-jay',N'$2b$10$pOVfJugPXinnXKfJ4.m02eDfB2RbT.oXBPTQ8PxzX2kk5uySh0uRW',N'engineer'),
	 (N'pd-lemuel',N'$2b$10$D2MWC.b4seBsgHz/z/zQieepQ3B/Crc83tVTVmLP0c2zht0zgZIVi',N'engineer');
›


INSERT INTO PatchManagementTracker.dbo.Users (username, password, [role]) VALUES
(N'admin1', N'$2b$10$d9offwG5.vK.yo8QFaRlPuvk/UPBcypvkjlrNondBQ8h.dnFIhw4O', N'admin'),
(N'pd-travis', N'$2b$10$l0pBGBT1Qc.l7w3EQHR1Wu8C3iU82HZCUBYX.2L3j5yDoVyOP3aQq', N'engineer'),
(N'pd-jay', N'$2b$10$pOVfJugPXinnXKfJ4.m02eDfB2RbT.oXBPTQ8PxzX2kk5uySh0uRW', N'engineer'),
(N'pd-lemuel', N'$2b$10$D2MWC.b4seBsgHz/z/zQieepQ3B/Crc83tVTVmLP0c2zht0zgZIVi', N'engineer');