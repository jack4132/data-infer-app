import pandas as pd
import numpy as np

def check_column_contains(df, chars):
    	if any(df.astype(str).str.contains(char).any() for char in chars):
            return True;return False

def infer_and_convert_data_types(df,limit):
	for col in df.columns:
		if len(df[col]):
			print(df[col].dtypes=='bool')
			# since boolean and date time are convertible to int proper check must be done 
			df_converted = pd.to_numeric(df[col], errors='coerce') if not(check_column_contains(df[col],['-','/']) or df[col].dtypes=='bool') else df[col]
			print(df_converted,'before')
			if not df_converted.isna().all():  # If at least one value is numeric
				try:
					# if with na or missing values integer value will replace to 0 and checks for float or int particularly also the column should not be date time or boolean
					df[col]=pd.to_numeric(df[col],errors="coerce") if not(check_column_contains(df[col],['-','/']) or df[col].dtypes=='bool') else df[col]
					df[col]=df[col].fillna(0) if (df[col].isna().any()) else df[col]
					# Convert strings representing complex numbers into complex data types
					df[col]=df[col].astype(int) if all(int(value)==float(value) and (not df[col].dtypes=='bool') for value in df[col].dropna()) else df[col]
					# continue
				except (ValueError,TypeError):
					pass
				try:
					if (check_column_contains(df[col],['-','/'])):
						print(df[col],'date')
						df[col]=pd.to_datetime(df[col])
						continue
				except (ValueError,TypeError):
					pass
			if all(isinstance(value, str) and '+' in value and ('j' in value or 'i' in value) for value in df[col]):
				df[col] = df[col].apply(lambda x: complex(x.replace(' ', '').replace('i', 'j')))
			if (len(df[col].unique())/len(df[col]) <0.5 and len(df[col].unique())< len(df[col])*0.10):
				df[col]=pd.Categorical(df[col])
	return {'data':df.head(limit).append(pd.Series(df.dtypes),True),'total':len(df)}


	
def convert_column_to_type(df, column, target_type, index):
    try:
        if isinstance(column, str):
            # If column is a string (column name), use loc to select the column
            subset_df = df.loc[index:index+10, column]
        else:
            # If column is an integer (column index), use iloc to select the column
            subset_df = df.iloc[index:index+10, column]

        if target_type.startswith('int') or target_type.startswith('float'):
            
            converted_column = pd.to_numeric(subset_df, errors='coerce')
            converted_column=converted_column.fillna(0) if (converted_column.isna().any()) else converted_column
            
            converted_column=converted_column.astype(target_type)
			
        else:
            converted_column = subset_df.astype(target_type)
        
        return converted_column
    except (ValueError, TypeError):
        raise ValueError(f"Could not convert column to {target_type}")

def get_and_convert_data_types(input_file,types,start):
		converted_columns = []
		for index, type in enumerate(types):
			converted_columns.append(convert_column_to_type(input_file, index, type, start))
		return pd.concat(converted_columns, axis=1)
		
def get_data(input_file,types,start):
	
	if input_file.endswith('csv'):
		processed=get_and_convert_data_types(pd.read_csv(input_file),types,start)
	elif input_file.endswith('xlsx'):
		processed=get_and_convert_data_types(pd.read_excel(input_file,engine= 'openpyxl'),types,start)
	
	return processed.to_csv(index=False)


def edit_data(input_file,type,column,index):
	
	if input_file.endswith('csv'):
		processed=convert_column_to_type(pd.read_csv(input_file),column,type,index)
	elif input_file.endswith('xlsx'):
		processed=convert_column_to_type(pd.read_excel(input_file,engine= 'openpyxl'),column,type,index)
		
	return processed.to_csv(index=False)



def processed_data(input_file,limit):
	processed=''
	if input_file.name.endswith('csv'):
			processed=infer_and_convert_data_types(pd.read_csv(input_file),limit)
	elif input_file.name.endswith('xlsx'):
			processed=infer_and_convert_data_types(pd.read_excel(input_file,engine= 'openpyxl'),limit)
	return {'data':processed['data'].to_csv(index=False),'total':processed['total']}


