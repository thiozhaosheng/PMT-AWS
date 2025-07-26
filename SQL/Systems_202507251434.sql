CREATE TABLE dbo.Systems (
    system_id INT IDENTITY(1,1) PRIMARY KEY,
    system_name NVARCHAR(100) NOT NULL,
    os_type NVARCHAR(100) NOT NULL,
    ip_address NVARCHAR(45) NOT NULL,
    client_id INT NOT NULL
    -- Optionally: FOREIGN KEY (client_id) REFERENCES dbo.Clients(client_id)
);



INSERT INTO PatchManagementTracker.dbo.Systems (system_name,os_type,ip_address,client_id) VALUES
	 (N'sph-sys01',N'VMware ESXi',N'10.1.0.10',1),
	 (N'sph-sys02',N'Ubuntu Linux',N'10.1.0.11',1),
	 (N'sph-sys03',N'Ubuntu Linux',N'10.1.0.12',1),
	 (N'sph-sys04',N'vCenter Server',N'10.1.0.13',1),
	 (N'sph-sys05',N'Nutanix AHV',N'10.1.0.14',1),
	 (N'sph-sys06',N'Nutanix AHV',N'10.1.1.15',1),
	 (N'sph-sys07',N'Nutanix AHV',N'10.1.1.16',1),
	 (N'sph-sys08',N'vCenter Server',N'10.1.1.17',1),
	 (N'sph-sys09',N'Red Hat Linux',N'10.1.1.18',1),
	 (N'sph-sys10',N'Nutanix AHV',N'10.1.1.19',1);
INSERT INTO PatchManagementTracker.dbo.Systems (system_name,os_type,ip_address,client_id) VALUES
	 (N'mas-sys01',N'VMware ESXi',N'10.2.0.10',2),
	 (N'mas-sys02',N'Windows Server',N'10.2.0.11',2),
	 (N'mas-sys03',N'Nutanix AHV',N'10.2.0.12',2),
	 (N'mas-sys04',N'vCenter Server',N'10.2.0.13',2),
	 (N'mas-sys05',N'Ubuntu Linux',N'10.2.0.14',2),
	 (N'mas-sys06',N'Windows Server',N'10.2.1.15',2),
	 (N'mas-sys07',N'VMware ESXi',N'10.2.1.16',2),
	 (N'mas-sys08',N'Nutanix AHV',N'10.2.1.17',2),
	 (N'mas-sys09',N'Red Hat Linux',N'10.2.1.18',2),
	 (N'mas-sys10',N'Nutanix AHV',N'10.2.1.19',2);
INSERT INTO PatchManagementTracker.dbo.Systems (system_name,os_type,ip_address,client_id) VALUES
	 (N'pcs-sys01',N'VMware ESXi',N'10.3.0.10',3),
	 (N'pcs-sys02',N'Nutanix AHV',N'10.3.0.11',3),
	 (N'pcs-sys03',N'Windows Server',N'10.3.0.12',3),
	 (N'pcs-sys04',N'VMware ESXi',N'10.3.0.13',3),
	 (N'pcs-sys05',N'Red Hat Linux',N'10.3.0.14',3),
	 (N'pcs-sys06',N'vCenter Server',N'10.3.1.15',3),
	 (N'pcs-sys07',N'vCenter Server',N'10.3.1.16',3),
	 (N'pcs-sys08',N'VMware ESXi',N'10.3.1.17',3),
	 (N'pcs-sys09',N'Ubuntu Linux',N'10.3.1.18',3),
	 (N'pcs-sys10',N'Windows Server',N'10.3.1.19',3);
INSERT INTO PatchManagementTracker.dbo.Systems (system_name,os_type,ip_address,client_id) VALUES
	 (N'nus-sys01',N'Red Hat Linux',N'10.4.0.10',4),
	 (N'nus-sys02',N'Nutanix AHV',N'10.4.0.11',4),
	 (N'nus-sys03',N'Ubuntu Linux',N'10.4.0.12',4),
	 (N'nus-sys04',N'vCenter Server',N'10.4.0.13',4),
	 (N'nus-sys05',N'vCenter Server',N'10.4.0.14',4),
	 (N'nus-sys06',N'vCenter Server',N'10.4.1.15',4),
	 (N'nus-sys07',N'Nutanix AHV',N'10.4.1.16',4),
	 (N'nus-sys08',N'Nutanix AHV',N'10.4.1.17',4),
	 (N'nus-sys09',N'Windows Server',N'10.4.1.18',4),
	 (N'nus-sys10',N'VMware ESXi',N'10.4.1.19',4);
INSERT INTO PatchManagementTracker.dbo.Systems (system_name,os_type,ip_address,client_id) VALUES
	 (N'ntu-sys01',N'Windows Server',N'10.5.0.10',5),
	 (N'ntu-sys02',N'Nutanix AHV',N'10.5.0.11',5),
	 (N'ntu-sys03',N'Windows Server',N'10.5.0.12',5),
	 (N'ntu-sys04',N'vCenter Server',N'10.5.0.13',5),
	 (N'ntu-sys05',N'vCenter Server',N'10.5.0.14',5),
	 (N'ntu-sys06',N'Nutanix AHV',N'10.5.1.15',5),
	 (N'ntu-sys07',N'Nutanix AHV',N'10.5.1.16',5),
	 (N'ntu-sys08',N'Nutanix AHV',N'10.5.1.17',5),
	 (N'ntu-sys09',N'Red Hat Linux',N'10.5.1.18',5),
	 (N'ntu-sys10',N'Windows Server',N'10.5.1.19',5);
