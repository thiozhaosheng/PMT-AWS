CREATE TABLE dbo.Clients (
    client_id INT IDENTITY(1,1) PRIMARY KEY,
    company_name NVARCHAR(100) NOT NULL,
    industry NVARCHAR(100) NOT NULL,
    contact_email NVARCHAR(255) NOT NULL
);

INSERT INTO dbo.Clients (company_name, industry, contact_email)
VALUES
    (N'SPH', N'Media', N'contact@sph.com.sg'),
    (N'MAS', N'Finance', N'support@mas.gov.sg'),
    (N'PCS', N'Petrochemical', N'admin@pcs.com.sg'),
    (N'NUS', N'Education', N'it@nus.edu.sg'),
    (N'NTU', N'Education', N'helpdesk@ntu.edu.sg'),
    (N'Land Transport Authority', N'Government', N'sysadmin@lta.gov.sg');