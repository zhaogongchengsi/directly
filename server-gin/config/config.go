package config

type Server struct  {
	Port int
	Host string
	Prefix string
	Mode string
}

type  Config struct   {
	Server
}


func  ReadConfigs ( path , t , key string ,value any)  error {
	vp, err := InitViper(path,t)
	err = vp.UnmarshalKey(key, value)
	return  err
}



