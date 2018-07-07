using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace todo_core_webapi.Controllers
{
	[Route("v1")]
	public class RootController : Controller
	{
		[HttpGet]
		public string Get()
		{
			return "TodoWebApi v1 v1 path";
		}
	
	}
}