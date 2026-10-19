@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"

rem Personal Blog - commit to a review branch and open a pull request.
rem It never pushes to the base branch; review and merge happen on GitHub.

set "BASE=v5"
set "REPO_URL=https://github.com/Howard-Starfield/Personal_Knowledge_Site"
set "STAGED=%TEMP%\blog-push-staged-%RANDOM%.txt"
set "BLOCKED=%TEMP%\blog-push-blocked-%RANDOM%.txt"

echo ============================================
echo   Personal Blog - Branch + Pull Request
echo ============================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [x] Git is not installed or not on PATH.
  goto :end
)

set "BRANCH="
for /f "delims=" %%b in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set "BRANCH=%%b"
if not defined BRANCH (
  echo [x] This folder is not a Git repository.
  goto :end
)
if "%BRANCH%"=="HEAD" (
  echo [x] Detached HEAD. Check out a branch first.
  goto :end
)

rem Never commit on the base branch: carry the changes to a new review branch.
if /i "%BRANCH%"=="%BASE%" (
  call :new_branch
  if errorlevel 1 goto :end
)

echo [1/4] Staging changes allowed by .gitignore on branch %BRANCH%...
git add -A
if errorlevel 1 goto :end

rem Guard: refuse to publish private, licensed or extracted material even if
rem it was force-added or an ignore rule was removed.
git -c core.quotePath=false diff --cached --name-only > "%STAGED%"
findstr /r /i /c:"^private/" /c:"^scratch/" /c:"^codex_dot_characters/" /c:"^docs/AI_AGENT_CRASH_COURSE/" /c:"^docs/accounting_ai_crash_course/" /c:"Bookerly" /c:"course-package\.json" /c:"\.asar" "%STAGED%" > "%BLOCKED%"
if not errorlevel 1 (
  echo.
  echo [x] These staged files must not be published:
  type "%BLOCKED%"
  git reset -q
  echo.
  echo Nothing was committed. Remove or ignore the files above, then run again.
  goto :end
)

git diff --cached --quiet
if not errorlevel 1 (
  echo Nothing to commit. Already up to date!
  goto :end
)

echo.
echo [2/4] Review what will be committed:
git diff --cached --stat --stat-count=40
echo.
set "OK="
set /p "OK=Commit and push these changes to branch %BRANCH%? (y/N): "
if /i not "%OK%"=="y" (
  git reset -q
  echo Cancelled. Nothing was committed; your changes are still in the working tree.
  goto :end
)

set "MSG="
set /p "MSG=Commit message (Enter for default): "
if not defined MSG set "MSG=Update content"
set "MSG=%MSG:"='%"

echo.
echo [3/4] Committing and pushing branch %BRANCH%...
git commit -q -m "%MSG%"
if errorlevel 1 goto :end
git push -u origin "%BRANCH%"
if errorlevel 1 (
  echo [x] Push failed. Check your credentials or network.
  goto :end
)

echo.
echo [4/4] Opening the pull request into %BASE%...
where gh >nul 2>&1
if errorlevel 1 (
  echo Create the pull request here:
  echo %REPO_URL%/compare/%BASE%...%BRANCH%?expand=1
) else (
  gh pr create --base "%BASE%" --head "%BRANCH%" --fill --web
  if errorlevel 1 (
    echo If GitHub CLI could not open it, use:
    echo %REPO_URL%/compare/%BASE%...%BRANCH%?expand=1
  )
)

echo.
echo Done. Nothing was pushed to %BASE%; review and merge the pull request on GitHub.
goto :end

:new_branch
set "STAMP="
for /f "delims=" %%t in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmm"') do set "STAMP=%%t"
if not defined STAMP set "STAMP=%RANDOM%"
set "NEW="
set /p "NEW=You are on %BASE%. New branch name (Enter for update-%STAMP%): "
if not defined NEW set "NEW=update-%STAMP%"
git check-ref-format --branch "%NEW%" >nul 2>&1
if errorlevel 1 (
  echo [x] Invalid branch name: %NEW%
  exit /b 1
)
git switch -c "%NEW%"
if errorlevel 1 exit /b 1
set "BRANCH=%NEW%"
exit /b 0

:end
if exist "%STAGED%" del /q "%STAGED%"
if exist "%BLOCKED%" del /q "%BLOCKED%"
echo.
pause
endlocal
