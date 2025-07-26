CREATE TABLE dbo.Patches (
    patch_id INT IDENTITY(1,1) PRIMARY KEY,
    patch_name NVARCHAR(100) NOT NULL,
    patched BIT NOT NULL,
    patch_date DATE NULL,
    notes NVARCHAR(255) NULL,
    system_id INT NOT NULL
    -- You can add FOREIGN KEY later if needed
);


INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',1),
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',1),
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',1),
	 (N'Kernel 6.2.9',1,'2025-06-12',N'Security patch',2),
	 (N'OpenSSL 3.1.1',1,'2025-06-20',N'CVE fix',2),
	 (N'SSH 9.0',0,NULL,N'Waiting for window',2),
	 (N'Kernel 6.2.9',1,'2025-06-12',N'Security patch',3),
	 (N'OpenSSL 3.1.1',1,'2025-06-20',N'CVE fix',3),
	 (N'SSH 9.0',0,NULL,N'Waiting for window',3),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',4);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',4),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',4),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',5),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',5),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',5),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',6),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',6),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',6),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',7),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',7);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',7),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',8),
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',8),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',8),
	 (N'Kernel 5.14',1,'2025-06-10',N'Stability update',9),
	 (N'OpenSSL 3.0.8',0,NULL,N'Failed checksum verification',9),
	 (N'sudo CVE patch',1,'2025-06-22',N'Critical privilege escalation fix',9),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',10),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',10),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',10);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',11),
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',11),
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',11),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',12),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',12),
	 (N'Defender Update',0,NULL,N'Pending after reboot',12),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',13),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',13),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',13),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',14);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',14),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',14),
	 (N'Kernel 6.2.9',1,'2025-06-12',N'Security patch',15),
	 (N'OpenSSL 3.1.1',1,'2025-06-20',N'CVE fix',15),
	 (N'SSH 9.0',0,NULL,N'Waiting for window',15),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',16),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',16),
	 (N'Defender Update',0,NULL,N'Pending after reboot',16),
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',17),
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',17);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',17),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',18),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',18),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',18),
	 (N'Kernel 5.14',1,'2025-06-10',N'Stability update',19),
	 (N'OpenSSL 3.0.8',0,NULL,N'Failed checksum verification',19),
	 (N'sudo CVE patch',1,'2025-06-22',N'Critical privilege escalation fix',19),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',20),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',20),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',20);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',21),
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',21),
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',21),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',22),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',22),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',22),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',23),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',23),
	 (N'Defender Update',0,NULL,N'Pending after reboot',23),
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',24);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',24),
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',24),
	 (N'Kernel 5.14',1,'2025-06-10',N'Stability update',25),
	 (N'OpenSSL 3.0.8',0,NULL,N'Failed checksum verification',25),
	 (N'sudo CVE patch',1,'2025-06-22',N'Critical privilege escalation fix',25),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',26),
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',26),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',26),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',27),
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',27);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'TLS patch',0,NULL,N'Blocked by config lock',27),
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',28),
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',28),
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',28),
	 (N'Kernel 6.2.9',1,'2025-06-12',N'Security patch',29),
	 (N'OpenSSL 3.1.1',1,'2025-06-20',N'CVE fix',29),
	 (N'SSH 9.0',0,NULL,N'Waiting for window',29),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',30),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',30),
	 (N'Defender Update',0,NULL,N'Pending after reboot',30);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Kernel 5.14',1,'2025-06-10',N'Stability update',31),
	 (N'OpenSSL 3.0.8',0,NULL,N'Failed checksum verification',31),
	 (N'sudo CVE patch',1,'2025-06-22',N'Critical privilege escalation fix',31),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',32),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',32),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',32),
	 (N'Kernel 6.2.9',1,'2025-06-12',N'Security patch',33),
	 (N'OpenSSL 3.1.1',1,'2025-06-20',N'CVE fix',33),
	 (N'SSH 9.0',0,NULL,N'Waiting for window',33),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',34);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',34),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',34),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',35),
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',35),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',35),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',36),
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',36),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',36),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',37),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',37);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',37),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',38),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',38),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',38),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',39),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',39),
	 (N'Defender Update',0,NULL,N'Pending after reboot',39),
	 (N'ESXi 8.0U1',1,'2025-05-30',N'Build 21424296',40),
	 (N'VMware Tools 12.2',0,NULL,N'Staged for auto-deploy',40),
	 (N'ESXi Rollup 03/2025',1,'2025-06-18',N'Quarterly updates',40);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',41),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',41),
	 (N'Defender Update',0,NULL,N'Pending after reboot',41),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',42),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',42),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',42),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',43),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',43),
	 (N'Defender Update',0,NULL,N'Pending after reboot',43),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',44);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',44),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',44),
	 (N'vCenter 8.0.2c',1,'2025-06-05',N'Upgraded for compatibility',45),
	 (N'Photon OS Patch 5',1,'2025-06-16',N'OS layer patch',45),
	 (N'TLS patch',0,NULL,N'Blocked by config lock',45),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',46),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',46),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',46),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',47),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',47);
INSERT INTO PatchManagementTracker.dbo.Patches (patch_name,patched,patch_date,notes,system_id) VALUES
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',47),
	 (N'AOS 6.5.3',1,'2025-06-01',N'Upgraded cluster-wide',48),
	 (N'NCC 4.7.1',1,'2025-06-15',N'Health check fixes',48),
	 (N'Foundation 5.1.2',0,NULL,N'Scheduled next week',48),
	 (N'Kernel 5.14',1,'2025-06-10',N'Stability update',49),
	 (N'OpenSSL 3.0.8',0,NULL,N'Failed checksum verification',49),
	 (N'sudo CVE patch',1,'2025-06-22',N'Critical privilege escalation fix',49),
	 (N'KB5023706',1,'2025-06-15',N'Applied successfully',50),
	 (N'KB5030211',1,'2025-07-01',N'Patch Tuesday release',50),
	 (N'Defender Update',0,NULL,N'Pending after reboot',50);
