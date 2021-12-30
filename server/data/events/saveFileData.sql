INSERT INTO [dbo].[fileData]
        ([id]
        ,[f_name]
        ,[contents]
        ,[f_path])
VALUES
    (@id,@f_name,@contents,@f_path)