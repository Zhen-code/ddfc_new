import OSS from 'ali-oss'
import axios from 'axios'
import Api from './api'
let upload = (type,file,token)=>{
	return new Promise((resolve,reject)=>{
		let client;
		let name;
		axios({
			url: Api.imgUuid,
			method: 'GET',
		}).then((rsp)=>{
			let res = rsp.data;
			let key = res.data;
			axios({
				url: Api.sts,
				method: 'GET',
				headers: {
					'Authorization': token
				}
			}).then((rsp)=>{
				let res = rsp.data;
				if(res.code === 200){
					client = new OSS({
						accessKeyId: res.data.sts.accessKeyId,
						accessKeySecret: res.data.sts.accessKeySecret,
						stsToken: res.data.sts.securityToken,
						region: 'oss-cn-hangzhou',
						bucket: res.data.bucket
					});
					name = res.data.prefix+'/'+key+'.'+type;
					client.put(name,file).then((response)=>{
						resolve(response)
					}).catch((error)=>{
						reject(error)
					})
				}else{
					reject(res);
				}
			}).catch((err)=>{
				reject(err);
			})
		}).catch((err)=>{
			reject(err);
		})
	})
};
export default upload;

